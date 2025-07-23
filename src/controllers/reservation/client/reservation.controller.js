import Booking from "../../../models/reservation.model.js";
import { bookingDto } from "../../../models/dto/reservation.dto.js";

export const createReservation = async (req, res) => {
    const { courtId, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    const reserved = await Booking.find({
        courtId,
        date,
        $or: [
            {
                startTime: { $lt: endTime },
                endTime: { $gt: startTime },
            },
        ],
    });
    if (reserved.length > 0) {
        return res.status(400).json({ message: "Court is already reserved" });
    }

    const reservation = new Booking({
        userId,
        courtId,
        date,
        startTime,
        endTime,
    });
    await reservation.save();

    res.status(200).json({
        message: "reservation completed",
        reservation: bookingDto(reservation),
    });
};

export const cancelReservation = async (req, res) => {
    const reservation = await Booking.findByIdAndDelete(req.params.id);

    if (!reservation) {
        return res.status(404).json({ message: "reservation not found" });
    }
    res.status(200).json({ message: "reservation canceled" });
};

export const viewMyReservation = async (req, res) => {
    const reservation = await Booking.findById(req.params.id);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    if (reservation.userId.toString() !== req.user.id) {
        return res.status(403).json({
            message:
                "Access denied. You are not authorized to view this reservation.",
        });
    }
    res.status(200).json(reservation);
};
