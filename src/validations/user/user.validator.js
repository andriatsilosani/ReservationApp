import Joi from "joi";

export const userUpdateSchema = Joi.object({
    name: Joi.string().min(2),
    lastname: Joi.string().min(2),
});

export const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const passwordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string()
        .min(6)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
            "any.only": "Confirm password does not match new password",
        }),
});
