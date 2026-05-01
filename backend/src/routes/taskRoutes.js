import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask, getTasksByBatch } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:batchId", protect, getTasksByBatch);

export default router;
