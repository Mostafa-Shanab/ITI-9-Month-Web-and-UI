const ans = document.getElementById("Answer");
let expression = "";

function EnterNumber(val) {
  expression += val;
  ans.value = expression;
}

function EnterOperator(op) {
  if (expression === "") return;
  const lastChar = expression[expression.length - 1];
  if ("+-*/".includes(lastChar)) return;
  expression += op;
  ans.value = expression;
}

function EnterClear() {
  expression = "";
  ans.value = "";
}

function EnterEqual() {
  if (expression === "") return;
  const numbers = expression.split(/[\+\-\*\/]/).map(Number);
  const operators = expression.replace(/[0-9.]/g, "").split("");
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];
    const num = numbers[i + 1];
    switch (op) {
      case "+":
        result += num;
        break;
      case "-":
        result -= num;
        break;
      case "*":
        result *= num;
        break;
      case "/":
        result /= num;
        break;
    }
  }
  ans.value = result;
  expression = result.toString();
}
