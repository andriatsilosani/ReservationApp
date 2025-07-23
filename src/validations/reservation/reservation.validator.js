import Joi from "joi";
import mongoose from "mongoose";

export const createReservationSchema = Joi.object({
    courtId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("Invalid CourtId");
            }
            return value;
        })
        .required(),
    date: Joi.date().iso().greater("now").required(),
    startTime: Joi.string()
        .pattern(/^((0[0-1])|(08|09)|1\d|2[0-3]):00$/)
        .required(),
    endTime: Joi.string()
        .pattern(/^((0[0-2])|(09)|1\d|2[0-3]):00$/)
        .required(),
});
