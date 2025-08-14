import express from "express";
import {
    deleteUser,
    getAll,
    getUserById,
    updateUser,
} from "../../controllers/user/admin.controller.js";
import {
    validateObjectId,
    validateBody,
} from "../../../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import { userUpdateSchema } from "../../../../validations/user/user.validator.js";
import {
    authenticate,
    authorizeAdmin,
} from "../../../../middlewares/auth.middleware.js";

const router = express.Router();

// get all
router.get("/users", authenticate, authorizeAdmin, asyncHandler(getAll));

// get by id
router.get(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(getUserById),
);

//delete
router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(deleteUser),
);

//update
router.put(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    validateBody(userUpdateSchema),
    asyncHandler(updateUser),
);

export default router;
