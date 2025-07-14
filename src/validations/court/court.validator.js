import Joi from "joi";

export const courtUpdateSchema = Joi.object({
    name: Joi.string(),
    location: Joi.string(),
    description: Joi.string().allow(""), // allow empty string
    price: Joi.number(),
    sport: Joi.string().valid("tennis", "padel", "billiard", "bowling"),
    isAvailable: Joi.boolean(),
});
