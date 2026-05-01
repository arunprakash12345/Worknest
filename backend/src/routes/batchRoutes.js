import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createBatch, getBatches } from "../controllers/batchController.js";

const router = express.Router();

router.post("/", protect, createBatch);
router.get("/", protect, getBatches);

export default router;
