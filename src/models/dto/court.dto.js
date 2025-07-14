export const courtDto = (court) => {
    return {
        name: court.name,
        courtNumber: court.courtNumber,
        location: court.location,
        description: court.description,
        price: court.price,
        sport: court.sport,
        isAvalable: court.isAvalable,
    };
};
