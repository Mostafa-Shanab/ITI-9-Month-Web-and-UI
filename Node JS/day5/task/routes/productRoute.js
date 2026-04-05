import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authorization.js";

const router = express.Router();

// All product routes require a valid JWT
router.use(protect);

// Any authenticated user
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", authorize("admin"), createProduct);
router.put("/:id", authorize("admin"), updateProduct);
router.delete("/:id", authorize("admin"), deleteProduct);

export default router;
