import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, batch, priority, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      batch,
      priority,
      status,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS BY BATCH
export const getTasksByBatch = async (req, res) => {
  try {
    const tasks = await Task.find({ batch: req.params.batchId })
      .populate("assignee", "name email")
      .populate("createdBy", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
