import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
