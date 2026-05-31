import express from "express";
import {
  createComment,
  getTaskComments,
} from "../controllers/taskCommentController.js";

const router = express.Router();

router.post("/:taskId", createComment);
router.get("/:taskId", getTaskComments);

export default router;
