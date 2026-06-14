import { Product } from "@/models/Product";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();
    if (req.method === "GET") {
      const {
        search,
        sortBy = "price",
        sortOrder = "asc",
        minPrice,
        maxPrice,
        minRating,
      } = req.query;

      let filter = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      if (minRating) {
        filter.rating = { $gte: parseFloat(minRating) };
      }

      let sort = {};
      if (sortBy === "price") {
        sort.price = sortOrder === "asc" ? 1 : -1;
      } else if (sortBy === "rating") {
        sort.rating = sortOrder === "asc" ? 1 : -1;
      } else if (sortBy === "newest") {
        sort.createdAt = -1;
      } else {
        sort.title = 1;
      }

      const products = await Product.find(filter).sort(sort).lean();

      res.status(200).json({
        success: true,
        data: products,
      });
    } else if (req.method === "POST") {
      const { title, description, price, thumbnail, rating, category, stock } =
        req.body;

      if (!title || !description || !price || !thumbnail) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const product = await Product.create({
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        rating: parseFloat(rating) || 0,
        category,
        stock: parseInt(stock) || 0,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Error in products API:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
