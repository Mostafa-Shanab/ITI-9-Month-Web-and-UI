import express from "express";
import {
  getAllCategories,
  getCategoryById,
  getAllProductsUnderCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/:id/products", getAllProductsUnderCategory);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
