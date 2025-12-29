let radius = parseFloat(prompt("Enter the radius of the circle:"));
let area = Math.PI * Math.pow(radius, 2);
alert("Circle Area = " + area);

let number = parseFloat(prompt("Enter a number to calculate its square root:"));
let squareRoot = Math.sqrt(number);
alert("Square Root = " + squareRoot);

let angle = parseFloat(prompt("Enter an angle in degrees:"));
let radians = angle * (Math.PI / 180);
let cosValue = Math.cos(radians);
console.log("Cos(" + angle + ") = " + cosValue);
