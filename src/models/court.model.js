import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        courtNumber: {
            type: Number,
            required: true,
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

courtSchema.index({ company: 1, courtNumber: 1 }, { unique: true });

const Court = mongoose.model("Court", courtSchema);

export default Court;
