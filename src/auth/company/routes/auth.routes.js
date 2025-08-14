import express, { Router } from "express";
import { asyncHandler } from "../../../middlewares/error.middleware.js";
import { validateBody } from "../../../middlewares/validation.middleware.js";
import { companyRegisterSchema } from "../validations/auth.validator.js";
import { registerCompany } from "../controller/auth.controller.js";
import {
    authenticate,
    authorizeAuthor,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    authenticate,
    authorizeAuthor,
    validateBody(companyRegisterSchema),
    asyncHandler(registerCompany),
);

export default router;
