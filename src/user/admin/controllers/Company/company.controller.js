import Company from "../../../../models/company.model.js";

export const getAllCompany = async (req, res) => {
    const companies = await Company.find();
    res.status(200).json(companies);
};

export const getCompany = async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404).json({ message: "company not found" });
    }
    res.status(200).json(company);
};

export const deleteCompany = async (req, res) => {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
        return resstatus(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "company deleted successfully" });
};
