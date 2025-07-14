import Court from "../models/court.model.js";

export const findCourtByName = async (name) => {
    return await Court.findOne({ name });
};
