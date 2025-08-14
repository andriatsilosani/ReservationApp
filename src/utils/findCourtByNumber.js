import Court from "../models/court.model.js";

export const findCourtByNumber = async (courtNumber) => {
    return await Court.findOne({ courtNumber });
};
