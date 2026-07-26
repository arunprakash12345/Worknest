import Task from "../models/Task.js";
import Batch from "../models/Batch.js";
import { sendTaskAssignedEmail } from "../../service/emailService.js";

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

    let assignees = [];

    // ASSIGN TO ALL
    if (assignedTo === "ALL") {
      const batchData = await Batch.findById(batch);

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

    const task = await Task.create({
      title,
      description,
      status,
      type,
      priority,
      batch,
      assignees,
      dueDate,
      createdBy: req.user._id || req.user.id,
    });
      const populatedTask = await Task.findById(task._id).populate(
      "assignees.user",
      "name email"
    );

    for (const assignee of populatedTask.assignees) {
      if (assignee.user?.email) {
        await sendTaskAssignedEmail({
          to: assignee.user.email,
          taskTitle: task.title,
          dueDate: task.dueDate,
        });
      }
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS BY BATCH

export const getTasksByBatch = async (req, res) => {
  try {
    const { batch } = req.query;

    const userId = req.user?._id || req.user?.id;
    const role = req.user?.role;

    let tasks;

    // STUDENT -> ONLY ASSIGNED TASKS
    if (role === "STUDENT") {
      tasks = await Task.find({
        batch,
        "assignees.user": userId,
      })
        .populate("assignees.user", "name email image")
        .populate("createdBy", "name");
    }

    // MENTOR / ADMIN -> ALL TASKS
    else {
      tasks = await Task.find({ batch })
        .populate("assignees.user", "name email image")
        .populate("createdBy", "name");
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({
      "assignees.user": userId,
    });
    const role = req.user.role;

    let totalTasks = 0;
    let overdueTasks = 0;
    let completedTasks = 0;
    let inProgressTasks = 0;

    tasks.forEach((task) => {
      const myAssignment = task.assignees.find(
        (a) => a.user.toString() === userId
      );

      if (!myAssignment) return;

      totalTasks++;

      // COMPLETED
      if (myAssignment.status === "DONE") {
        completedTasks++;
      }

      // IN PROGRESS
      if (myAssignment.status === "IN_PROGRESS") {
        inProgressTasks++;
      }

      // OVERDUE
      const isOverdue =
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        myAssignment.status !== "DONE";

      if (isOverdue) {
        overdueTasks++;
      }
    });

    res.json({
      totalTasks,
      overdueTasks,
      completedTasks,
      inProgressTasks,
    });
    if (role === "STUDENT") {
      const filteredTasks = tasks.filter((task) =>
        task.assignees.some(
          (assignee) => assignee.user && assignee.user._id.toString() === userId
        )
      );

      return res.json(filteredTasks);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const tasks = await Task.find({
      "assignees.user": userId,
    })
      .populate("batch", "title")
      .sort({ createdAt: -1 });

    const formattedTasks = tasks.map((task) => {
      const myAssignment = task.assignees.find(
        (a) => a.user.toString() === userId.toString()
      );

      return {
        ...task._doc,
        myStatus: myAssignment?.status,
      };
    });

    res.json(formattedTasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?._id || req.user?.id;
    const userRole = req.user?.role;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Students update their own assignee status only
    if (userRole === "STUDENT") {
      const assigneeIndex = task.assignees.findIndex(
        (a) => a.user.toString() === userId.toString()
      );

      if (assigneeIndex === -1) {
        return res.status(403).json({ message: "You are not assigned to this task" });
      }

      task.assignees[assigneeIndex].status = status;
      await task.save();

      const updatedTask = await Task.findById(id)
        .populate("assignees.user", "name email image");

      return res.json(updatedTask);
    }

    // Mentors/Admins update the global task status
    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignees.user", "name email image");

    res.json(updatedTask);
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

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;
    const userRole = req.user?.role;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only creator, mentor, or admin can edit task
    const isCreator = task.createdBy?.toString() === userId?.toString();
    const canEdit = isCreator || userRole === "MENTOR" || userRole === "ADMIN";

    if (!canEdit) {
      return res.status(403).json({ message: "Not authorized to edit this task" });
    }

    const {
      title,
      description,
      status,
      type,
      priority,
      dueDate,
      assignedTo,
    } = req.body;

    // Update basic fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (type) task.type = type;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    // Handle assignee updates
    if (assignedTo !== undefined) {
      const batch = await Batch.findById(task.batch);

      if (assignedTo === "ALL" && batch) {
        task.assignees = batch.members?.map((member) => ({
          user: member.user?._id || member.user || member._id,
          status: "TODO",
        })) || [];
      } else if (assignedTo === "") {
        task.assignees = [];
      } else if (assignedTo) {
        task.assignees = [{ user: assignedTo, status: "TODO" }];
      }
    }

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignees.user", "name email image")
      .populate("createdBy", "name");

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
