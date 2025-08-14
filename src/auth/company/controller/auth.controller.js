import Company from "../../../models/company.model.js";
import { findCompanyByName } from "../../../utils/findCompanyByName.js";

export const registerCompany = async (req, res) => {
    const { name, phone, email, courtNum, owner } = req.body;

    const existingCompany = await findCompanyByName(name);
    if (existingCompany) {
        return res.status(400).json({
            message: "Company is Already Registered",
        });
    }

    const newCompany = new Company({
        name,
        phone,
        email,
        courtNum,
        owner,
    });

    await newCompany.save();

    res.status(404).json({ message: "Company registered Successfully" });
};
