import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskCommentRoutes from "./routes/taskCommentRoutes.js";

import protect from "./middleware/authMiddleware.js";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// PUBLIC ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

// PROTECTED ROUTES
app.use("/api/batches", protect, batchRoutes);
app.use("/api/tasks", protect, taskRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/task-comments", protect, taskCommentRoutes);

export default app;
