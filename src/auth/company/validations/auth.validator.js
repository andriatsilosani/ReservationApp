import Joi from "joi";
import mongoose from "mongoose";

export const companyRegisterSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string(),
    phone: Joi.string()
        .pattern(/^\d{9}$/)
        .required()
        .messages({
            "string.pattern.base": '"phone" must be exactly 9 digits',
        }),
    email: Joi.string().email().required(),
    courtNum: Joi.number().integer().min(1).required(),
    owner: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("Invalid CourtId");
        }
        return value;
    }),
});
