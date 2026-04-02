import Student from '../models/studentModel.js';

//crud
//create  post /student  body:{name,email}   url - http://localhost:5000/student

export const createStudent=async(req,res)=>{
    const {name,email,status}=req.body;
    const newStudent = new Student({
        name,email,status
    })
   await newStudent.save();
   res.status(201).json({data:newStudent})
}


//read  get  /student body -   url - http://localhost:5000/student

export const getALLStudent =async(req,res)=>{
  const students=  await Student.find();
  res.status(200).json({data:students})
}

//update patch /student/:id   body -{name :""} url - http://localhost:5000/student/1234
export const updateStudent =async(req,res)=>{
    const {id}=req.params;
    // const {name,email,status}=req.body;

   const student= await Student.findByIdAndUpdate(id,req.body,{new:true})
   res.status(200).json({data:student})
}



export const getAllStudentForView=async(req,res)=>{
  const student=  await Student.find();
  res.render("studentUI",{title:"All Students",data:student})
}