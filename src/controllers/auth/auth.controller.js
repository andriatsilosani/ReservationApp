import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail } from "../../utils/findUserByEmail.js";
import crypto from "crypto";

dotenv.config();

export const registerUser = async (req, res) => {
    const { email, name, lastname, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "Email is already used." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );
    res.status(200).json({
        message: "Login successful!",
        token,
        user: {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
        },
    });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const url = process.env.RESET_URL;

    const resetLink = `${url}/${token}`;

    console.log("Reset link (send by email):", resetLink);

    res.status(200).json({ message: "Reset link has been sent to your email" });
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
};
