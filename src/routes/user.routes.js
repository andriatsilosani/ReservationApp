import express from "express";
import {
    deleteUser,
    getAll,
    getUserById,
    updateUser,
} from "../controllers/user.controller.js";
import { validateObjectId } from "../middlewares/validateId.middleware.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { userUpdateSchema } from "../validations/user.validation.js";

const router = express.Router();

// get all
router.get("/users", asyncHandler(getAll));

// get by id
router.get("/:id", validateObjectId(), asyncHandler(getUserById));

//delete
router.delete("/:id", validateObjectId(), asyncHandler(deleteUser));

//update
router.put(
    "/:id",
    validateObjectId(),
    validateBody(userUpdateSchema),
    asyncHandler(updateUser),
);

export default router;
