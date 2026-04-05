import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
