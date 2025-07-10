import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findByEmail } from "../../utils/findByEmail.js";

dotenv.config();

export const registerUser = async (req, res) => {
    const { email, name, lastname, password } = req.body;

    const existingUser = await findByEmail(email);
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
    const user = await findByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
        { id: user._id, email: user.email },
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
