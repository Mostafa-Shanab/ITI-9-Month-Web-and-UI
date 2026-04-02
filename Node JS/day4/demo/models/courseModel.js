import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    instructor: {
      name: { type: String, required: true },
      email: { type: String },
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("course", courseSchema);
export default Course;
