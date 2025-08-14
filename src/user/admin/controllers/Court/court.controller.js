import mongoose from "mongoose";
import Company from "../../../../models/company.model.js";
import Court from "../../../../models/court.model.js";
import { courtDto } from "../../../../models/dto/court.dto.js";

export const addCourt = async (req, res) => {
    const { companyId } = req.params;
    const { description, location, price, sport } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const company = await Company.findByIdAndUpdate(
            companyId,
            {
                $inc: { courtNum: 1 },
            },
            { new: true, session },
        );

        if (!company) {
            return res.status(404).json({ message: "company Not Found" });
        }

        const [court] = await Court.create(
            [
                {
                    company: company._id,
                    courtNumber: company.courtNum,
                    location,
                    description,
                    price,
                    sport,
                },
            ],
            { session },
        );

        await session.commitTransaction();
        return res.status(201).json(courtDto(court, company));
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const deleteCourt = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const court = await Court.findById(req.params.id).session(session);
        if (!court) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Court Not Found" });
        }
        const { company, courtNumber } = court;

        await Court.deleteOne({ _id: court._id }).session(session);

        await Court.updateMany(
            {
                company,
                courtNumber: {
                    $gt: courtNumber,
                },
            },
            {
                $inc: {
                    courtNumber: -1,
                },
            },
        ).session(session);

        await Company.updateOne(
            { _id: company },
            { $inc: { courtNUm: -1 } },
        ).session(session);

        await session.commitTransaction();
        return res.status(200).json({ message: "Court deleted successfully" });
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const getCourt = async (req, res) => {
    const id = req.params.id;
    const court = await Court.findById(id).populate({ path: "company" });
    if (!court) {
        return res.status(404).json({ message: "Court Not Found!" });
    }
    res.status(200).json(courtDto(court, court.company));
};

export const listCourts = async (req, res) => {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const courts = await Court.find({ company: companyId }).sort({
        courtNumber: 1,
    });
    res.status(200).json(courts);
};

export const updateCourt = async (req, res) => {
    const { id } = req.params;
    const { location, description, price, sport, isAvailable } = req.body;

    if ("courtNumber" in req.body) {
        return res
            .status(400)
            .json({ message: "courtNumber cannot be updated directly" });
    }

    const court = await Court.findByIdAndUpdate(
        id,
        { location, description, price, sport, isAvailable },
        { new: true, runValidators: true },
    ).populate({ path: "company" });
    if (!court) {
        return res.status(404).json({ message: "Court Not Found!!!" });
    }
    res.status(200).json(courtDto(court, court.company));
};
