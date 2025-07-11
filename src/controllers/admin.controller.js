import { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";
import { userDto } from "../models/dto/user.dto.js";

export const getAll = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User Not Found!!!" });
    }
    res.status(200).json(userDto(user));
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({ message: "User Not Found!!!" });
    }
    res.status(200).json({ message: "User deleted successfully." });
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname } = req.body;

    const user = await User.findByIdAndUpdate(
        id,
        { name, lastname },
        { new: true, runValidators: true },
    );
    if (!user) {
        return res.status(404).json({ message: "User Not Found!!!" });
    }
    res.status(200).json(userDto(user));
};
