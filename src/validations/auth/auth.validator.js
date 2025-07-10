import Joi from "joi";

export const userRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    password: Joi.string()
        .min(6)
        .pattern(/^[a-zA-Z0-9]+$/),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
