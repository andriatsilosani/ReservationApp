import express from "express";
import {
    addCourt,
    deleteCourt,
    listCourts,
    getCourt,
    updateCourt,
} from "../../controllers/Court/court.controller.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import {
    authenticate,
    authorizeAdmin,
} from "../../../../middlewares/auth.middleware.js";
import {
    validateBody,
    validateObjectId,
} from "../../../../middlewares/validation.middleware.js";
import {
    courtUpdateSchema,
    courtCreateSchema,
} from "../../../../validations/court/court.validator.js";

const router = express.Router();

router.post(
    "/:companyId",
    authenticate,
    authorizeAdmin,
    validateObjectId("companyId"),
    validateBody(courtCreateSchema),
    asyncHandler(addCourt),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(deleteCourt),
);

router.get(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(getCourt),
);

router.get("/", authenticate, authorizeAdmin, asyncHandler(listCourts));

router.put(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    validateBody(courtUpdateSchema),
    asyncHandler(updateCourt),
);

export default router;
