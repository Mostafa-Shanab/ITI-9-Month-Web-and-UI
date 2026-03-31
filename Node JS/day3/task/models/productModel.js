import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema); // wrap for use - ODM (Object Data Modeling)

export default productModel;
