import Joi from "joi";
import mongoose from "mongoose";

export const courtCreateSchema = Joi.object({
    companyId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("Invalid companyId");
            }
            return value;
        })
        .required(),
    courtNumber: Joi.number(),
    location: Joi.string(),
    description: Joi.string().allow(""),
    price: Joi.number(),
    sport: Joi.string().valid("tennis", "padel", "billiard", "bowling"),
    isAvailable: Joi.boolean(),
});

export const courtUpdateSchema = Joi.object({
    name: Joi.string(),
    location: Joi.string(),
    description: Joi.string().allow(""),
    price: Joi.number(),
    sport: Joi.string().valid("tennis", "padel", "billiard", "bowling"),
    isAvailable: Joi.boolean(),
});
