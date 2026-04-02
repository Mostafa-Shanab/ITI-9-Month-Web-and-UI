import express from "express";
import { upload } from "../config/multerConfig.js";
const router = express.Router();

router.post("/", upload.single("currentFile"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "file uploaded successfully",
    file: req.file,
  });
});

export default router;
