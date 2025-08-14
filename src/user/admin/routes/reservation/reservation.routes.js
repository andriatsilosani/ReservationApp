import express from "express";
import {
    cancelReservation,
    createReservation,
    viewAllReservations,
    viewOneReservation,
} from "../../controllers/reservation/reservation.controller.js";
import { asyncHandler } from "../../../../middlewares/error.middleware.js";
import {
    authenticate,
    authorizeAdmin,
} from "../../../../middlewares/auth.middleware.js";
import { validateBody } from "../../../../middlewares/validation.middleware.js";
import { createReservationSchema } from "../../../../validations/reservation/reservation.validator.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    authorizeAdmin,
    asyncHandler(viewAllReservations),
);

router.get(
    "/:id",
    authenticate,
    authorizeAdmin,
    asyncHandler(viewOneReservation),
);

router.delete(
    "/:id",
    authenticate,
    authorizeAdmin,
    asyncHandler(cancelReservation),
);

router.post(
    "/",
    authenticate,
    authorizeAdmin,
    validateBody(createReservationSchema),
    asyncHandler(createReservation),
);

export default router;
