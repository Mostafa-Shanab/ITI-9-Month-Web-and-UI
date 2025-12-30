let n = parseInt(prompt("Enter Size of Array"));

let arr = new Array(n);

for (let i = 0; i < n; i++) {
  arr[i] = parseFloat(prompt(`Enter Num '${i + 1}'`));
}

arr.sort((a, b) => a - b);
console.log("arr (Ascending) : ", arr);

arr.sort((a, b) => b - a);
console.log("arr (Descending) : ", arr);
