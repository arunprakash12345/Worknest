import Batch from "../models/Batch.js";

// CREATE BATCH
export const createBatch = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const batch = await Batch.create({
      title,
      description,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
