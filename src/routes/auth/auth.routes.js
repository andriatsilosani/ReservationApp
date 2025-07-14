import express from "express";
import {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
} from "../../controllers/auth/auth.controller.js";
import { validateBody } from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../middlewares/error.middleware.js";
import {
    loginSchema,
    resetPasswordSchema,
    userRegisterSchema,
} from "../../validations/auth/auth.validator.js";
import { emailSchema } from "../../validations/user/user.validator.js";

const router = express.Router();

router.post(
    "/signup",
    validateBody(userRegisterSchema),
    asyncHandler(registerUser),
);
router.post("/login", validateBody(loginSchema), asyncHandler(loginUser));

router.post(
    "/reset-password",
    validateBody(emailSchema),
    asyncHandler(forgotPassword),
);

router.post(
    "/reset-password/:token",
    validateBody(resetPasswordSchema),
    asyncHandler(resetPassword),
);

export default router;
