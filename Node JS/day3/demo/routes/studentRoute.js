import express from "express";
import {createStudent,getALLStudent,updateStudent} from "../controller/studentController.js";


const router =express.Router();


router.post("/",createStudent)
router.get("/",getALLStudent)
router.patch("/:id",updateStudent)

export default router;