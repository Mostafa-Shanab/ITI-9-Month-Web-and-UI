use FacultySystemV2
db.createCollection("student")
db.createCollection("faculty")
db.createCollection("course")

db.faculty.insertMany([
{
  _id: 1,
  FacultyName: "Computer Science",
  Address: "Cairo"
},
{
  _id: 2,
  FacultyName: "Engineering",
  Address: "Giza"
}
])
db.faculty.find()

db.courses.insertMany([
{
  _id: 1,
  CourseName: "Database",
  FinalMark: 100
},
{
  _id: 2,
  CourseName: "Algorithms",
  FinalMark: 100
},
{
  _id: 3,
  CourseName: "Networks",
  FinalMark: 100
}
])
db.courses.find()

db.students.insertMany([
{
  _id: 1,
  FirstName: "Mostafa",
  lastName: "Shanab",
  IsFired: false,
  FacultyID: 1,
  CoursesIDs: [1,2],
  courses: [
    { CourseID: 1, grade: 80 },
    { CourseID: 2, grade: 90 }
  ]
},
{
  _id: 2,
  FirstName: "Mostafa1",
  lastName: "Shanab1",
  IsFired: true,
  FacultyID: 2,
  CoursesIDs: [1,3],
  courses: [
    { CourseID: 1, grade: 70 },
    { CourseID: 3, grade: 85 }
  ]
}
])
db.students.find()

db.students.aggregate([
{
  $project:{
    FullName:{
      $concat:["$FirstName"," ","$lastName"]
    },
    avgGrade:{
      $avg:"$courses.grade"
    }
  }
}
])

db.courses.aggregate([
{
  $group:{
    _id:null,
    totalFinalMarks:{
      $sum:"$FinalMark"
    }
  }
}
])

db.students.aggregate([
{
  $match:{FirstName:"Mostafa"}
},
{
  $lookup:{
    from:"courses",
    localField:"CoursesIDs",
    foreignField:"_id",
    as:"StudentCourses"
  }
}
])

db.students.aggregate([
{
  $match:{FirstName:"Mostafa"}
},
{
  $lookup:{
    from:"courses",
    localField:"courses.CourseID",
    foreignField:"_id",
    as:"StudentCourses"
  }
}
])

db.students.aggregate([
{
  $match:{FirstName:"Mostafa"}
},
{
  $lookup:{
    from:"faculty",
    localField:"FacultyID",
    foreignField:"_id",
    as:"FacultyData"
  }
}
])

