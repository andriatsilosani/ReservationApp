import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["client", "admin"],
        default: "client",
    },
    newPassowrd: String,
    confirmPassword: String,
    resetToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
