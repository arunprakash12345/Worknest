import express from "express";
import { getTasksByBatch, createTask } from "../controllers/taskController.js";
const router = express.Router();

router.get("/", getTasksByBatch);
router.post("/", createTask);

export default router;
