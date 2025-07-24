import express from "express";
import {
    cancelReservation,
    createReservation,
    viewMyReservation,
} from "../../../controllers/reservation/client/reservation.controller.js";
import {
    validateBody,
    validateObjectId,
} from "../../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../../middlewares/error.middleware.js";
import { createReservationSchema } from "../../../validations/reservation/reservation.validator.js";
import { authenticate } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    validateBody(createReservationSchema),
    asyncHandler(createReservation),
);

router.get(
    "/:id",
    authenticate,
    validateObjectId(),
    asyncHandler(viewMyReservation),
);

router.delete(
    "/:id",
    authenticate,
    validateObjectId(),
    asyncHandler(cancelReservation),
);

export default router;