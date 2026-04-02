import express from "express";
const router =express.Router();

import { createCourse,getCourse,addStudentToCourse,getALLstudentBycourse } from "../controller/courseController.js";


router.post("/",createCourse)
router.get("/",getCourse)
router.patch("/:courseID/student",addStudentToCourse)
router.get("/:courseID/student",getALLstudentBycourse)

export default router;