import "dotenv/config";
import express from "express";
import connectDB from "./config/dbconfig.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoute.js";
import { errorHandler, notFound } from "./middleware/ErrorHandling.js";

const app = express();

await connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => res.json({ status: "API is running" }));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
