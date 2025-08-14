import { companyDto } from "./company.dto.js";

export const courtDto = (court, company) => {
    return {
        company: companyDto(company),
        courtNumber: court.courtNumber,
        description: court.description,
        price: court.price,
        sport: court.sport,
        isAvalable: court.isAvalable,
    };
};
