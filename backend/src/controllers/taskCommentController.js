import TaskComment from "../models/TaskComment.js";

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

    const comment = await TaskComment.create({
      task: taskId,
      user: userId,
      message,
    });

    const populatedComment = await TaskComment.findById(comment._id).populate(
      "user",
      "name role image",
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
