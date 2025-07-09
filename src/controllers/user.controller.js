import User from "../models/user.model";

export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch {
        console.error(error);
        res.status(400).json({ message: "Something went wrong!!!" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User Not Found!!!" });
        }
        res.status(200).json(user);
    } catch {
        console.error(error);
        res.status(400).json({ message: "Something went wrong!!!" });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User Not Found!!!" });
        }
        res.status(200).json(user);
    } catch {
        console.error(error);
        res.status(400).json({ message: "Something went wrong!!!" });
    }
};
