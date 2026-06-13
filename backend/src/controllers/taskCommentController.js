import TaskComment from "../models/TaskComment.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendDiscussionEmail } from "../../service/emailService.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { message } = req.body;

    const userId = req.user?._id || req.user?.id;

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Create comment
    const comment = await TaskComment.create({
      task: taskId,
      user: userId,
      message,
    });

    // Get task details
    const task = await Task.findById(taskId)
      .populate("createdBy", "name email")
      .populate("assignees.user", "name email");

    const currentUser = await User.findById(userId);
    const isMentor =
      task.createdBy?._id?.toString() === userId.toString();

    if (isMentor) {
      for (const assignee of task.assignees) {
        console.log("STUDENT EMAIL:", assignee.user?.email);
      }

      for (const assignee of task.assignees) {
        if (assignee.user?.email) {
          await sendDiscussionEmail({
            to: assignee.user.email,
            subject: `New feedback on ${task.title}`,
            taskTitle: task.title,
            senderName: currentUser.name,
            message,
          });
        }
      }
    } else {
      // Student commented -> notify mentor

      if (task.createdBy?.email) {
        await sendDiscussionEmail({
          to: task.createdBy.email,
          subject: `Student replied on ${task.title}`,
          taskTitle: task.title,
          senderName: currentUser.name,
          message,
        });
        console.log("STUDENT COMMENT DETECTED");
        console.log("MENTOR EMAIL:", task.createdBy?.email);
      }
    }

    // Return populated comment
    const populatedComment = await TaskComment.findById(comment._id).populate(
      "user",
      "name role image"
    );

    res.status(201).json(populatedComment);
  } catch (err) {
    console.log("CREATE COMMENT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET COMMENTS FOR TASK
export const getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await TaskComment.find({
      task: taskId,
    })
      .populate("user", "name role image")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (err) {
    console.log("GET COMMENTS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};