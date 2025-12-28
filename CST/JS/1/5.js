let startIndex = parseFloat(prompt("Enter Start Index"));
let endIndex = parseFloat(prompt("Enter End Index"));

let sum = 0;

// for (let i = startIndex; i <= endIndex; i++) {
//   if (i % 3 == 0) {
//     console.log("Number multiple of 3 : ", i);
//     sum += i;
//   }
//   // else if (i % 5 == 0) {
//   if (i % 5 == 0) {
//     console.log("Number multiple of 5 : ", i);
//     sum += i;
//   }
// }
// console.log("Total Sum : ", sum);

let multiplesOf3 = [];
let multiplesOf5 = [];

for (let i = startIndex; i <= endIndex; i++) {
  if (i % 3 === 0) {
    multiplesOf3.push(i);
    sum += i;
  }
  if (i % 5 === 0) {
    multiplesOf5.push(i);
    sum += i;
  }
}
document.writeln("Number multiple of 3: " + multiplesOf3.join(", ") + "<br>");
document.writeln("Number multiple of 5: " + multiplesOf5.join(", ") + "<br>");
document.writeln("Total sum is " + sum);
