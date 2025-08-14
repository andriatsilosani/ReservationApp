import express from "express";
import {
    deleteProfile,
    getProfile,
    updatePassword,
    updateProfile,
} from "../../controllers/user/client.controller.js";
import { authenticate } from "../../../../middlewares/auth.middleware.js";
import { validateBody } from "../../../../middlewares/validation.middleware.js";
import { userUpdateSchema } from "../../../../validations/user/user.validator.js";
import { passwordSchema } from "../../../../validations/user/user.validator.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";

const router = express.Router();

router.get("/", authenticate, asyncHandler(getProfile));
router.delete("/", authenticate, asyncHandler(deleteProfile));
router.put(
    "/",
    authenticate,
    validateBody(userUpdateSchema),
    asyncHandler(updateProfile),
);
router.patch(
    "/",
    authenticate,
    validateBody(passwordSchema),
    asyncHandler(updatePassword),
);

export default router;
