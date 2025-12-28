let firstNum = parseFloat(prompt("Enter First Number"));
let secondNum = parseFloat(prompt("Enter Second Number"));
let thirdNum = parseFloat(prompt("Enter Third Number"));

if (firstNum % secondNum == 0 && firstNum % thirdNum == 0) {
  console.log(`${firstNum} is Divisable by both ${secondNum} and ${thirdNum}`);
} else if (firstNum % secondNum == 0) {
  console.log(`${firstNum} is Divisable by ${secondNum} only`);
} else if (firstNum % thirdNum == 0) {
  console.log(`${firstNum} is Divisable by ${thirdNum} only`);
}
