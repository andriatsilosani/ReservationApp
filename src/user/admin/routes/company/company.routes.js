import express from "express";
import {
    authenticate,
    authorizeAdmin,
} from "../../../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import {
    deleteCompany,
    getAllCompany,
    getCompany,
} from "../../controllers/Company/company.controller.js";
import { validateObjectId } from "../../../../middlewares/validation.middleware.js";

const router = express.Router();

router.get(
    "/companies",
    authenticate,
    authorizeAdmin,
    asyncHandler(getAllCompany),
);

router.get(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(getCompany),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(deleteCompany),
);

export default router;
