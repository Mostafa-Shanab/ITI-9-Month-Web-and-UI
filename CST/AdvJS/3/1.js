function Shape(numOfSides) {
  if (this.constructor == Shape) {
    throw new Error("Can't Instantiate Object from Shape Class!");
  }
  var numSides = numOfSides;
  Object.defineProperty(this, "numOfSides", {
    get: function () {
      return numSides;
    },
  });
}
Shape.prototype.calcArea = function () {
  return "Implement It!";
};
Shape.prototype.calcPerimeter = function () {
  return "Implement It!";
};
Shape.prototype.toString = function () {
  return "Implement It!";
};
Shape.prototype.valueOf = function () {
  return "Implement It!";
};

function Rectangle(length, width) {
  if (this.constructor == Rectangle) {
    if (Rectangle.count == 0) {
      Rectangle.count++;
    } else {
      throw new Error("Can't Make More Than one Rectangle");
    }
  }

  Shape.call(this, 4);
  Object.defineProperty(this, "length", {
    value: length,
    writable: false,
    configurable: false,
    enumerable: false,
  });
  Object.defineProperty(this, "width", {
    value: width,
    writable: false,
    configurable: false,
    enumerable: false,
  });
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.calcArea = function () {
  return this.length * this.width;
};
Rectangle.prototype.calcPerimeter = function () {
  return 2 * (this.length + this.width);
};
Rectangle.prototype.toString = function () {
  return `Length : ${this.length}, Width : ${
    this.width
  }, Area : ${this.calcArea()}, Perimeter : ${this.calcPerimeter()}`;
};
Rectangle.prototype.valueOf = function () {
  return this.calcArea();
};
Rectangle.count = 0;

function Square(side) {
  if (this.constructor == Square) {
    if (Square.count == 0) {
      Square.count++;
    } else {
      throw new Error("Can't Make More Than one Square");
    }
  }

  Rectangle.call(this, side, side);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
Square.prototype.toString = function () {
  return `Side : ${
    this.length
  }, Area : ${this.calcArea()}, Perimeter : ${this.calcPerimeter()}`;
};
Square.count = 0;

var obj1 = new Square(2);
var obj2 = new Rectangle(3, 5);
// var obj3 = new Shape(5);
