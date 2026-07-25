import express from "express";
import {
  createComment,
  getTaskComments,
} from "../controllers/taskCommentController.js";
import protect from "../middleware/authMiddleware.js";
import {
  createCommentValidation,
  taskIdValidation,
  validate,
} from "../middleware/validators.js";

const router = express.Router();

router.post("/:taskId", protect, createCommentValidation, validate, createComment);
router.get("/:taskId", protect, taskIdValidation, validate, getTaskComments);

export default router;
