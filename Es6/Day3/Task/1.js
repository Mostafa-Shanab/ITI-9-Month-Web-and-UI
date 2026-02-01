const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Polygon {
  constructor(name) {
    this.name = name;
  }

  area() {
    return 0;
  }

  draw() {}
}

class Rectangle extends Polygon {
  constructor(x, y, width, height) {
    super("Rectangle");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  toString() {
    return `${this.name} | Width: ${this.width}, Height: ${this.height}, Area: ${this.area()}`;
  }
}

class Square extends Rectangle {
  constructor(x, y, side) {
    super(x, y, side, side);
    this.name = "Square";
  }
}

class Circle extends Polygon {
  constructor(x, y, radius) {
    super("Circle");
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  toString() {
    return `${this.name} | Radius: ${this.radius}, Area: ${this.area().toFixed(2)}`;
  }
}

class Triangle extends Polygon {
  constructor(x, y, base, height) {
    super("Triangle");
    this.x = x;
    this.y = y;
    this.base = base;
    this.height = height;
  }

  area() {
    return 0.5 * this.base * this.height;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.base, this.y);
    ctx.lineTo(this.x + this.base / 2, this.y - this.height);
    ctx.closePath();
    ctx.stroke();
  }

  toString() {
    return `${this.name} | Base: ${this.base}, Height: ${this.height}, Area: ${this.area()}`;
  }
}

const rect = new Rectangle(50, 50, 120, 60);
const square = new Square(220, 50, 80);
const circle = new Circle(400, 80, 40);
const triangle = new Triangle(150, 250, 100, 80);

rect.draw();
square.draw();
circle.draw();
triangle.draw();

console.log(rect.toString());
console.log(square.toString());
console.log(circle.toString());
console.log(triangle.toString());
