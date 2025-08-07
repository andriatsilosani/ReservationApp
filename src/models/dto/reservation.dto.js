export const bookingDto = (booking) => {
    return {
        courtId: booking.courtId,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
    };
};
