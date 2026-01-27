function generateCourseInfo(courseObj = {}) {
  const defaultCourse = {
    courseName: "ES6",
    courseDuration: "3 days",
    courseOwner: "JavaScript",
  };

  const allowedProps = Object.keys(defaultCourse);

  const passedProps = Object.keys(courseObj);
  const invalidProps = passedProps.filter(
    (prop) => !allowedProps.includes(prop),
  );

  if (invalidProps.length > 0) {
    throw new Error(`Invalid properties: ${invalidProps.join(", ")}`);
  }

  const courseInfo = Object.assign({}, defaultCourse, courseObj);

  console.log("Course Information:");
  console.log(`Name: ${courseInfo.courseName}`);
  console.log(`Duration: ${courseInfo.courseDuration}`);
  console.log(`Owner: ${courseInfo.courseOwner}`);
}

generateCourseInfo();

generateCourseInfo({ courseName: "React" });

generateCourseInfo({
  courseName: "Node.js",
  courseDuration: "5 days",
  courseOwner: "Backend",
});

generateCourseInfo({
  courseName: "Vue",
  level: "Advanced",
});
