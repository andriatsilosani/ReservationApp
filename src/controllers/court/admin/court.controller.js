import Court from "../../../models/court.model.js";
import { findCourtByName } from "../../../utils/findCourtByName.js";
import { courtDto } from "../../../models/dto/court.dto.js";

export const createCourt = async (req, res) => {
    const { name, location, description, price, sport, isAvailable } = req.body;

    const existingCourt = await findCourtByName(name);
    if (existingCourt) {
        return res.status(400).json({ message: "Court already exists." });
    }

    const newCourt = new Court({
        name,
        location,
        description,
        price,
        sport,
        isAvailable,
    });

    await newCourt.save();

    res.status(201).json({ message: "Court added successfully" });
};

export const updateCourt = async (req, res) => {
    const { id } = req.params;
    const { name, location, description, price, sport, isAvailable } = req.body;

    const court = await Court.findByIdAndUpdate(
        id,
        { name, location, description, price, sport, isAvailable },
        { new: true, runValidators: true },
    );
    if (!court) {
        return res.status(404).json({ message: "Court Not Found!!!" });
    }
    res.status(200).json(courtDto(court));
};

export const deleteCourt = async (req, res) => {
    const court = await Court.findByIdAndDelete(req.params.id);

    if (!court) {
        return res.status(404).json({ message: "Court Not Found!!!" });
    }
    res.status(200).json({ message: "Court deleted successfully." });
};

export const getAllCourts = async (req, res) => {
    const courts = await Court.find();
    res.status(200).json(courts);
};

export const getOneCourt = async (req, res) => {
    const court = await Court.findById(req.params.id);
    res.status(200).json(courtDto(court));
};
