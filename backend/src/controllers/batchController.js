import Batch from "../models/Batch.js";

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

// GET ALL BATCHES
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate("createdBy", "name email");

    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members.user", "name email image");

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBatchMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberIds } = req.body;

    console.log("MEMBER IDS:", memberIds);

    const formattedMembers = memberIds.map((memberId) => ({
      user: memberId,
      role: "MEMBER",
    }));

    console.log("FORMATTED MEMBERS:", formattedMembers);

    const batch = await Batch.findByIdAndUpdate(
      id,
      {
        $push: {
          members: {
            $each: formattedMembers,
          },
        },
      },
      {
        returnDocument: "after",
      }
    ).populate("members.user", "name email image");

    res.json(batch);
  } catch (err) {
    console.log("ADD MEMBERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};