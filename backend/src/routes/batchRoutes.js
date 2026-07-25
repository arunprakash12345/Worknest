import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createBatch,
  getBatches,
  getBatchById,
  addBatchMembers,
  updateBatch,
} from "../controllers/batchController.js";
import {
  createBatchValidation,
  addMembersValidation,
  mongoIdValidation,
  validate,
} from "../middleware/validators.js";

const router = express.Router();

router.post("/", protect, createBatchValidation, validate, createBatch);
router.get("/", protect, getBatches);
router.put("/:id", protect, mongoIdValidation, validate, updateBatch);
router.patch("/:id/members", protect, addMembersValidation, validate, addBatchMembers);
router.get("/:id", protect, mongoIdValidation, validate, getBatchById);

export default router;
