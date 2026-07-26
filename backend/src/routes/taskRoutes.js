import express from "express";
import {
  getTasksByBatch,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTasks,
  getDashboardStats,
  getMyTasks,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import {
  createTaskValidation,
  updateTaskStatusValidation,
  deleteTasksValidation,
  validate,
} from "../middleware/validators.js";

const router = express.Router();

router.get("/dashboard-stats", protect, getDashboardStats);
router.get("/my-tasks", protect, getMyTasks);
router.get("/", protect, getTasksByBatch);
router.post("/", protect, createTaskValidation, validate, createTask);
router.put("/:id/status", protect, updateTaskStatusValidation, validate, updateTaskStatus);
router.put("/:id", protect, createTaskValidation, validate, updateTask);
router.delete("/", protect, deleteTasksValidation, validate, deleteTasks);

export default router;
