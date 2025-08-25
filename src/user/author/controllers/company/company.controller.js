import Company from "../../../../models/company.model.js";
import { companyDto } from "../../../../models/dto/company.dto.js";

export const getCompany = async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404).json({ message: "company Not Found" });
    }
    res.status(200).json(companyDto(company));
};

export const deleteCompany = async (req, res) => {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
        return res.status(404).json({ message: "company not found" });
    }
    res.status(200).json({ message: "company deleted successfully" });
};

export const updateCompany = async (req, res) => {
    const { location } = await req.body;
    const company = Company.findByIdAndUpdate(req.params.id, { location });
    if (!company) {
        return res.status(404).json({ message: "company not found" });
    }
    res.status(200).json(companyDto(company));
};