import User from '../models/user.model.js'

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user
}