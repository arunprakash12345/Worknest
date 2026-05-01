import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    status: {
      type: String,
      enum: ["ACTIVE", "PLANNING", "COMPLETED"],
      default: "PLANNING",
    },

    category: { type: String },

    startDate: { type: Date },
    endDate: { type: Date },

    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["ADMIN", "MENTOR", "STUDENT"],
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Batch", batchSchema);
