function* fibonacciByCount(count) {
  let a = 0,
    b = 1;
  let i = 0;

  while (i < count) {
    yield a;
    [a, b] = [b, a + b];
    i++;
  }
}

// const fib1 = fibonacciByCount(7);

// for (let num of fib1) {
//   console.log(num);
//   console.log("");
// }

function* fibonacciByMax(maxValue) {
  let a = 0,
    b = 1;

  while (a <= maxValue) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// const fib2 = fibonacciByMax(20);

// for (let num of fib2) {
//   console.log(num);
//   console.log("");
// }
