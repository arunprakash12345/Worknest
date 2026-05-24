import express from "express";
import {
  getTasksByBatch,
  createTask,
  updateTaskStatus,
  deleteTasks,
  getDashboardStats,
  getMyTasks,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/dashboard-stats", protect, getDashboardStats);
router.get("/my-tasks", protect, getMyTasks);
router.get("/", protect, getTasksByBatch);
router.post("/", createTask);
router.put("/:id/status", updateTaskStatus);
router.delete("/", deleteTasks);

export default router;
