import express from "express";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import {
    deleteCompany,
    getCompany,
    updateCompany,
} from "../../controllers/company/company.controller.js";
import {
    authenticate,
    authorizeAuthor,
} from "../../../../middlewares/auth.middleware.js";
import { validateObjectId } from "../../../../middlewares/validation.middleware.js";

const router = express.Router();

router.get(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    asyncHandler(getCompany),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    asyncHandler(deleteCompany),
);

router.patch(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    asyncHandler(updateCompany),
);

export default router;
