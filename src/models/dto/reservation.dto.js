export const bookingDto = (booking) => {
    return {
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
    };
};
