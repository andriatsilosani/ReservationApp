import express from "express";
import {
    addCourt,
    deleteCourt,
    getCourt,
    listCourts,
    updateCourt,
} from "../../controllers/courts/court.controller.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import {
    validateBody,
    validateObjectId,
} from "../../../../middlewares/validation.middleware.js";
import {
    authenticate,
    authorizeAuthor,
} from "../../../../middlewares/auth.middleware.js";
import {
    courtCreateSchema,
    courtUpdateSchema,
} from "../../../../validations/court/court.validator.js";
import Company from "../../../../models/company.model.js";

const router = express.Router();

router.post(
    "/:companyId",
    authenticate,
    authorizeAuthor,
    validateObjectId("companyId"),
    validateBody(courtCreateSchema),
    asyncHandler(addCourt),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    asyncHandler(deleteCourt),
);

router.get(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    asyncHandler(getCourt),
);

router.get("/", authenticate, authorizeAuthor, asyncHandler(listCourts));

router.put(
    "/:id",
    authenticate,
    authorizeAuthor,
    validateObjectId(),
    validateBody(courtUpdateSchema),
    asyncHandler(updateCourt),
);

export default router;
