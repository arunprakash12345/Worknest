import express from "express";
import {
  getTasksByBatch,
  createTask,
  updateTaskStatus,
  deleteTasks,
  getDashboardStats,
  getMyTasks,
} from "../controllers/taskController.js";
const router = express.Router();
router.get("/dashboard-stats", getDashboardStats);
router.get("/my-tasks", getMyTasks);
router.get("/", getTasksByBatch);
router.post("/", createTask);
router.put("/:id/status", updateTaskStatus);
router.delete("/", deleteTasks);

export default router;
