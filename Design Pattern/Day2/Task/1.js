// Base Class
class Teacher {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `Teacher: ${this.name}`;
  }
}

// Base Decorator
class TeacherDecorator {
  constructor(teacher) {
    this.teacher = teacher;
  }

  getInfo() {
    return this.teacher.getInfo();
  }
}

// Salary Decorator
class SalaryDecorator extends TeacherDecorator {
  constructor(teacher, salary) {
    super(teacher);
    this.salary = salary;
  }

  getInfo() {
    return `${super.getInfo()}, Salary: ${this.salary}`;
  }
}

// Nationality Decorator
class NationalityDecorator extends TeacherDecorator {
  constructor(teacher, nationality) {
    super(teacher);
    this.nationality = nationality;
  }

  getInfo() {
    return `${super.getInfo()}, Nationality: ${this.nationality}`;
  }
}

// Street Decorator
class StreetDecorator extends TeacherDecorator {
  constructor(teacher, street) {
    super(teacher);
    this.street = street;
  }

  getInfo() {
    return `${super.getInfo()}, Street: ${this.street}`;
  }
}

let teacher = new Teacher("Mostafa Shanab");

teacher = new SalaryDecorator(teacher, 100);
// teacher = new SalaryDecorator(teacher, 32);
teacher = new NationalityDecorator(teacher, "Egyptian");
teacher = new StreetDecorator(teacher, "Mokattam");

console.log(teacher.getInfo());
