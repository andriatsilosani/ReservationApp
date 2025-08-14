import Company from "../models/company.model.js";

export const findCompanyByName = async (name) => {
    return await Company.findOne({ name });
};
