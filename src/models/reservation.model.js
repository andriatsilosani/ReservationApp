import mongoose from "mongoose";

const bookingSchema = new mongoose.model({
    courtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Court",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "canceled", "completed"],
        default: "active",
    },
});

const Booking = mongoose.model("Booking", courtSchema);

export default Booking;
