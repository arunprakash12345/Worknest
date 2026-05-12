import Task from "../models/Task.js";
import Batch from "../models/Batch.js";

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

    console.log("REQ BODY:", req.body);
    console.log("assignedTo:", assignedTo);

    let assignees = [];

    // ASSIGN TO ALL
    if (assignedTo === "ALL") {
      const batchData = await Batch.findById(batch);

      console.log("BATCH MEMBERS:", batchData.members);

      assignees =
        batchData.members?.map((member) => ({
          user: member.user?._id || member.user || member._id,
          status: "TODO",
        })) || [];
    }

    // SINGLE ASSIGN
    else if (assignedTo && assignedTo !== "") {
      assignees = [
        {
          user: assignedTo,
          status: "TODO",
        },
      ];
    }

    console.log("FINAL ASSIGNEES:", assignees);

    const task = await Task.create({
      title,
      description,
      status,
      type,
      priority,
      batch,
      assignees,
      dueDate,
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS BY BATCH

export const getTasksByBatch = async (req, res) => {
  try {
    const { batch } = req.query;

    const tasks = await Task.find({ batch }).populate(
      "assignees.user",
      "name email image",
    );

    console.log("TASKS:", JSON.stringify(tasks, null, 2));

    res.json(tasks);
  } catch (err) {
    console.log("GET TASKS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
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
