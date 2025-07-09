import express from "express";
import { getAll, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

// get all
router.get("/users", getAll);

// get by id
router.get("/:id", getUserById);

export default router;
