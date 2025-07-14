import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        sport: {
            type: String,
            required: true,
            enum: ["tennis", "padel", "billiard", "bowling"],
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const Court = mongoose.model("Court", courtSchema);

export default Court;
