import User from "../models/user.model.js";
import { userDto } from "../models/dto/user.dto.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json(userDto(user));
};

export const updateProfile = async (req, res) => {
    const { name, lastname } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, lastname }    );
    if (!user) {
        return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json(userDto(user));
};

export const deleteProfile = async (req, res) => {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "Profile Deleted Successfully" });
};

export const updatePassword = async (req, res) => {
    const { password, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(400)
            .json({ message: "current password does not match" });
    }

    if (newPassword !== confirmPassword) {
        return res
            .status(400)
            .json({ message: "New Passwords does not match" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({ message: "Password Updated Successfully" });
};
