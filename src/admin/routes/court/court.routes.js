import express from "express";
import {
    createCourt,
    deleteCourt,
    getAllCourts,
    getOneCourt,
    updateCourt,
} from "../../../controllers/court/admin/court.controller.js";
import { asyncHandler } from "../../../middlewares/error.middleware.js";
import {
    authenticate,
    authorizeAdmin,
} from "../../../middlewares/auth.middleware.js";
import {
    validateBody,
    validateObjectId,
} from "../../../middlewares/validation.middleware.js";
import { courtUpdateSchema } from "../../../validations/court/court.validator.js";

const router = express.Router();

router.get("/", authenticate, authorizeAdmin, asyncHandler(getAllCourts));

router.post("/", authenticate, authorizeAdmin, asyncHandler(createCourt));

router.get(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(getOneCourt),
);

router.put(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    validateBody(courtUpdateSchema),
    asyncHandler(updateCourt),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    validateObjectId(),
    asyncHandler(deleteCourt),
);

export default router;
