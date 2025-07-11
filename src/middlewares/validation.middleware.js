import { isValidObjectId } from "mongoose";

export const validateObjectId = (paramName = "id") => {
    return (req, res, next) => {
        if (!isValidObjectId(req.params[paramName])) {
            return res.status(400).json({ message: "Invalid ID parameter!" });
        }
        next();
    };
};

export const validateBody = (schema) => {
    if (!schema) {
        throw new Error("Joi schema is required in validateBody middleware");
    }

    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.details
                    ? error.details.map((e) => e.message)
                    : "Invalid data.",
            });
        }
    };
};
