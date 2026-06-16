import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    reactions: {
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
