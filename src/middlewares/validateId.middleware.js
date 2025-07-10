import { isValidObjectId } from "mongoose";

export const validateObjectId = (paramName = "id") => {
    return (req, res, next) => {
        if (!isValidObjectId(req.params[paramName])) {
            return res.status(400).json({ message: "Invalid ID parameter!" });
        }
        next();
    };
};
