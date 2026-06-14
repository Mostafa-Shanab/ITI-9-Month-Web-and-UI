import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Unknown",
      trim: true,
    },
    type: {
      type: String,
      default: "quote",
    },
    category: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Quote =
  mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
