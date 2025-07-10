import Joi from "joi";

export const userUpdateSchema = Joi.object({
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
});