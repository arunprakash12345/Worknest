import express from "express";
import {
  getTasksByBatch,
  createTask,
  updateTaskStatus,
  deleteTasks,
} from "../controllers/taskController.js";
const router = express.Router();

router.get("/", getTasksByBatch);
router.post("/", createTask);
router.put("/:id/status", updateTaskStatus);
router.delete("/", deleteTasks);

export default router;
