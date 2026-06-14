import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  try {
    await connectDB();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (req.method === "GET") {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } else if (req.method === "PUT") {
      const { title, description, price, thumbnail, rating, category, stock } =
        req.body;

      const product = await Product.findByIdAndUpdate(
        id,
        {
          ...(title && { title }),
          ...(description && { description }),
          ...(price !== undefined && { price: parseFloat(price) }),
          ...(thumbnail && { thumbnail }),
          ...(rating !== undefined && { rating: parseFloat(rating) }),
          ...(category && { category }),
          ...(stock !== undefined && { stock: parseInt(stock) }),
        },
        { new: true, runValidators: true },
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } else if (req.method === "DELETE") {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Error in product ID API:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
