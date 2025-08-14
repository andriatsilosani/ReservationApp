import Booking from "../../../../models/reservation.model.js";
import { bookingDto } from "../../../../models/dto/reservation.dto.js";

export const viewAllReservations = async (req, res) => {
    const reservations = await Booking.find();
    res.status(200).json(reservations);
};

export const viewOneReservation = async (req, res) => {
    const { id } = req.params;
    const reservation = await Booking.findById(id);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not Found" });
    }
    res.status(200).json(reservation);
};

export const cancelReservation = async (req, res) => {
    const { id } = req.params;
    const reservation = await Booking.findByIdAndDelete(id);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not Found" });
    }
    res.status(200).json({ message: "Reservation Canceled Successfully" });
};

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
