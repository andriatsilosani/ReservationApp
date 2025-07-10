import express from "express";
import {
    registerUser,
    loginUser,
} from "../../controllers/auth/auth.controller.js";
import { validateBody } from "../../middlewares/validateBody.middleware.js";
import { asyncHandler } from "../../middlewares/error.middleware.js";
import {
    loginSchema,
    userRegisterSchema,
} from "../../validations/auth/auth.validator.js";

const router = express.Router();

router.post(
    "/signup",
    validateBody(userRegisterSchema),
    asyncHandler(registerUser),
);
router.post("/login", validateBody(loginSchema), asyncHandler(loginUser));

export default router;
