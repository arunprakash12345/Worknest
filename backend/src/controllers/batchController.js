import Batch from "../models/Batch.js";
import Task from "../models/Task.js";

// CREATE BATCH
export const createBatch = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
      mentor,
      members,
    } = req.body;

    const batch = await Batch.create({
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
      mentor,
      members,
      createdBy: req.user.id,
    });

    res.status(201).json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BATCHES (user's batches only)
export const getBatches = async (req, res) => {
  try {
    const userId = req.user.id;

    // Return batches where user is creator OR a member
    const batches = await Batch.find({
      $or: [
        { createdBy: userId },
        { "members.user": userId }
      ]
    })
      .populate("createdBy", "name email")
      .populate("members.user", "name email image")
      .lean();

    // Calculate progress for each batch based on tasks
    const batchesWithProgress = await Promise.all(
      batches.map(async (batch) => {
        const tasks = await Task.find({ batch: batch._id });
        
        if (tasks.length === 0) {
          return { ...batch, progress: 0 };
        }

        const completedTasks = tasks.filter(t => t.status === "DONE").length;
        const progress = Math.round((completedTasks / tasks.length) * 100);

        return { ...batch, progress };
      })
    );

    res.json(batchesWithProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members.user", "name email image")
      .lean();

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Calculate progress based on tasks
    const tasks = await Task.find({ batch: batch._id });
    let progress = 0;
    
    if (tasks.length > 0) {
      const completedTasks = tasks.filter(t => t.status === "DONE").length;
      progress = Math.round((completedTasks / tasks.length) * 100);
    }

    // Add active task count for each member
    const membersWithTaskCount = batch.members.map((member) => {
      const memberId = member.user?._id?.toString() || member.user?.toString();
      const activeTasks = tasks.filter((task) =>
        task.assignees?.some((a) => {
          const assigneeUserId = a.user?.toString();
          return assigneeUserId === memberId && a.status !== "DONE";
        })
      ).length;
      return { ...member, activeTasks };
    });

    res.json({ ...batch, members: membersWithTaskCount, progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBatchMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberIds } = req.body;

    const batch = await Batch.findById(id);

    // EXISTING MEMBER IDS
    const existingMemberIds = batch.members.map((m) => m.user.toString());

    // FILTER NEW UNIQUE USERS
    const uniqueNewMembers = memberIds
      .filter((memberId) => !existingMemberIds.includes(memberId))
      .map((memberId) => ({
        user: memberId,
        role: "MEMBER",
      }));

    batch.members.push(...uniqueNewMembers);

    await batch.save();

    const updatedBatch = await Batch.findById(id).populate(
      "members.user",
      "name email image",
    );

    res.json(updatedBatch);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// REMOVE BATCH MEMBER
export const removeBatchMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Only creator or admin can remove members
    const isCreator = batch.createdBy.toString() === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to remove members" });
    }

    // Remove member from batch
    batch.members = batch.members.filter(
      (m) => m.user.toString() !== memberId
    );

    await batch.save();

    // Also remove the member from any task assignments in this batch
    await Task.updateMany(
      { batch: id },
      { $pull: { assignees: { user: memberId } } }
    );

    const updatedBatch = await Batch.findById(id).populate(
      "members.user",
      "name email image"
    );

    res.json(updatedBatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE BATCH
export const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Only creator or admin can edit
    const isCreator = batch.createdBy.toString() === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to edit this batch" });
    }

    const {
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
    } = req.body;

    // Update fields
    if (title) batch.title = title;
    if (description !== undefined) batch.description = description;
    if (status) batch.status = status;
    if (priority) batch.priority = priority;
    if (startDate) batch.startDate = startDate;
    if (endDate) batch.endDate = endDate;

    await batch.save();

    const updatedBatch = await Batch.findById(id)
      .populate("createdBy", "name email")
      .populate("members.user", "name email image");

    res.json(updatedBatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BATCH
export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Only creator or admin can delete
    const isCreator = batch.createdBy.toString() === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this batch" });
    }

    // Delete all tasks associated with this batch
    await Task.deleteMany({ batch: id });

    // Delete the batch
    await Batch.findByIdAndDelete(id);

    res.json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
