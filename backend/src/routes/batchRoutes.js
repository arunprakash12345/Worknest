import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createBatch, getBatches } from "../controllers/batchController.js";
import { getBatchById, addBatchMembers } from "../controllers/batchController.js";

const router = express.Router();

router.post("/", protect, createBatch);
router.get("/", protect, getBatches);
router.patch("/:id/members", addBatchMembers);
router.get("/:id", getBatchById);


export default router;
