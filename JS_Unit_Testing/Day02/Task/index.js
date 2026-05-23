//? using mocha and chai
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Handle the data from the API
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

//? using expect test data length and type that returned from this code
//? Task 2 --> implement all the unit testing cases for the following functions using jasmine
MathUtils = function () {};

MathUtils.prototype.validate = function (...numbers) {
  if (numbers.length !== 2) {
    throw new Error("Function requires exactly 2 parameters");
  }

  numbers.forEach((num) => {
    if (typeof num !== "number") {
      throw new Error("Parameters must be numbers");
    }
  });
};

MathUtils.prototype.sum = function (...numbers) {
  this.validate(...numbers);

  return numbers[0] + numbers[1];
};

MathUtils.prototype.substract = function (number1, number2) {
  this.validate(number1, number2);

  return number1 - number2;
};

MathUtils.prototype.multiply = function (number1, number2) {
  this.validate(number1, number2);

  return number1 * number2;
};

MathUtils.prototype.divide = function (number1, number2) {
  this.validate(number1, number2);

  if (number2 === 0) {
    throw new Error("Cannot divide by zero");
  }

  return number1 / number2;
};

MathUtils.prototype.average = function (number1, number2) {
  this.validate(number1, number2);

  return (number1 + number2) / 2;
};

MathUtils.prototype.factorial = function (number) {
  if (typeof number !== "number") {
    throw new Error("Parameter must be a number");
  }

  if (number < 0) {
    throw new Error("There is no factorial for negative numbers");
  }

  if (!Number.isInteger(number)) {
    throw new Error("Factorial only works with integers");
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  return number * this.factorial(number - 1);
};

MathUtils.prototype.checkPositivity = function (number) {
  if (typeof number !== "number") {
    throw new Error("Parameter must be a number");
  }

  return number >= 0;
};

module.exports = { MathUtils };

//? Task 3 --> test two requests in node with using async/await instead of done()
