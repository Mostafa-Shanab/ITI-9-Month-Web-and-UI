import Course from "../models/courseModel.js";
import Student from "../models/studentModel.js";

export const createCourse = async (req, res) => {
  const { title, students, instructor } = req.body;
  const course = await Course.create({ title, students, instructor });
  res.status(201).json({
    success: true,
    course,
  });
};

export const getCourse = async (req, res) => {
  // {path:"students",select:"-_id name email"}
  const courses = await Course.find().populate("students", "-_id name email");
  res.status(200).json({
    success: true,
    courses,
  });
};

// /course/:id/student   patch  body id student

export const addStudentToCourse = async (req, res) => {
  const { courseID } = req.params;
  const { studentID } = req.body ||{};
console.log(req.body);

  if (!studentID || !courseID) {
    throw new Error("courseID and studentID are required");
  }
//     return res
//       .status(400)
//       .json({ message: "courseID and studentID are required" });
//   }
  const stud = await Student.findById(studentID);
  if (!stud) {
    throw new Error("student not found");
    // return res.status(404).json({ message: "student not found" });
  }
  const course = await Course.findById(courseID);
  if (!course) {
    throw new Error("course not found");
    // return res.status(404).json({ message: "course not found" });
  }
  course.students.push(studentID);
  await course.save();
  return res.status(200).json({ success: true, course });










  //   const stud = await Student.findById(studentID);
  //   if (!stud) {
    //  let e=  new Error("student not found");  //class (message ,status) next()
    //  e.status=404;
    //  throw e;
    // }
  //   const course = await Course.findById(courseID);
  //   course.students.push(studentID);
  //   await course.save();
  //  return res.status(200).json({
  //     success: true,
  //     course,
  //   });
};

export const getALLstudentBycourse = async (req, res) => {
  const course=await  Course.findById(req.params.courseID).populate("students","-_id name");
    if(!course){throw new Error ("course not found")};
    res.status(200).json({succes:true,students:course.students})

};
