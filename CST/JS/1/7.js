let startIndex;
while (true) {
  startIndex = parseFloat(prompt("Enter Start Index"));

  if (!isNaN(startIndex)) break;

  console.log(
    "%cInvalid input! Please re-enter correct data types.",
    "color: red; font-size: 16px; font-weight: bold;"
  );
}
let endIndex;
while (true) {
  endIndex = parseFloat(prompt("Enter End Index"));

  if (!isNaN(endIndex)) break;

  console.log(
    "%cInvalid input! Please re-enter correct data types.",
    "color: red; font-size: 16px; font-weight: bold;"
  );
}
let option;
while (true) {
  option = prompt("Enter Option (odd, even, no)");

  if (option == "odd" || option == "even" || option == "no") break;

  console.log(
    "%cInvalid input! Please re-enter correct data types.",
    "color: red; font-size: 16px; font-weight: bold;"
  );
}

let totalSum = 0;

if (startIndex < endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    if (option == "odd") {
      if (i % 2 != 0) {
        document.writeln(i + ", ");
        totalSum += i;
      }
    } else if (option == "even") {
      if (i % 2 == 0) {
        document.writeln(i + ", ");
        totalSum += i;
      }
    } else if (option == "no") {
      document.writeln(i + ", ");
      totalSum += i;
    }
  }
} else {
  for (let i = startIndex; i >= endIndex; i--) {
    if (option == "odd") {
      if (i % 2 != 0) {
        document.writeln(i + ", ");
        totalSum += i;
      }
    } else if (option == "even") {
      if (i % 2 == 0) {
        document.writeln(i + ", ");
        totalSum += i;
      }
    } else if (option == "no") {
      document.writeln(i + ", ");
      totalSum += i;
    }
  }
}

document.writeln("</br>" + "Total Sum : " + totalSum);
