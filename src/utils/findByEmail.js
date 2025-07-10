import User from "../models/user.model.js";

export const findByEmail = async (email) => {
    return await User.findOne({ email });
};
