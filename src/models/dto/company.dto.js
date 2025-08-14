export const companyDto = (company) => {
    return {
        name: company.name,
        location: company.location,
        phone: company.phone,
        email: company.email,
    };
};
