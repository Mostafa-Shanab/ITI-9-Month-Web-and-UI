import express from "express";
import mongoose from "mongoose";

import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();
const PORT = 5000;

app.use(express.json()); // parsing request

app.use("/products", productRoute); // keep organized
app.use("/categories", categoryRoute);

mongoose
  .connect("mongodb://localhost:27017/db_task_node_js_day3")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
