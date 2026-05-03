import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      type,
      priority,
      batch,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      type,
      priority,
      batch,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS BY BATCH

export const getTasksByBatch = async (req, res) => {
  try {
    const { batch } = req.query;

    const tasks = await Task.find({ batch });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const { taskIds } = req.body;

    await Task.deleteMany({
      _id: { $in: taskIds },
    });

    res.json({ message: "Tasks deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
