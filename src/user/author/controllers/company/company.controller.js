import Company from "../../../../models/company.model.js";
import { companyDto } from "../../../../models/dto/company.dto.js";

export const getCompany = (req, res) => {
    const company = Company.findById(req.params.id);
    if (!company) {
        return res.status(404).json({ message: "company Not Found" });
    }
    res.status(200).json(companyDto(company));
};
