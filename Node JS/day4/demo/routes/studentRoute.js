import express from "express";
import {createStudent,getALLStudent,updateStudent,getAllStudentForView} from "../controller/studentController.js";


const router =express.Router();


router.post("/",createStudent)
router.get("/",getALLStudent)
router.patch("/:id",updateStudent)
router.get("/view",getAllStudentForView)

export default router;