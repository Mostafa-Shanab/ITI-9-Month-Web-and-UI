import { connectDB } from "@/lib/mongodb";
import { Quote } from "@/models/Quote";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const quotes = await Quote.aggregate([
        { $match: { isActive: true } },
        { $sample: { size: 1 } },
      ]);

      if (quotes.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No quotes found" });
      }

      return res.status(200).json({ success: true, data: quotes[0] });
    } else if (req.method === "POST") {
      const { text, author, type, category } = req.body;

      if (!text) {
        return res
          .status(400)
          .json({ success: false, message: "Quote text is required" });
      }

      const quote = await Quote.create({
        text,
        author: author || "Unknown",
        type: type || "quote",
        category,
        isActive: true,
      });

      return res.status(201).json({
        success: true,
        message: "Quote created successfully",
        data: quote,
      });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in quotes API:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
