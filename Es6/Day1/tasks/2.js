function getMinMax(...numbers) {
  let min = Math.min(...numbers);
  let max = Math.max(...numbers);

  return { min, max };
}

let { min, max } = getMinMax(3, 7, 1, 9, 4, 12, 1, 5, 256, 61, 0, -5123);

console.log("Min value:", min);
console.log("Max value:", max);

// let arr = [8, 2, 15, 4];

// let { min, max } = getMinMax(...arr);

// console.log(min);
// console.log(max);
