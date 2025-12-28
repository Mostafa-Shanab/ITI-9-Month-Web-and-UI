let sum = 0;

// let currentNum = prompt("Enter Numberr");
// console.log("🚀 ~ currentNum:", currentNum);

while (true) {
  let currentNum = prompt("Enter Number");

  if (isNaN(currentNum)) {
    console.log("Enter Correct Number");
  } else {
    sum += parseFloat(currentNum);

    if (currentNum == 0 || sum > 100) {
      console.log(`Sum Final : ${sum}`);
      break;
    }

    console.log(`Sum : ${sum}`);
  }
}
