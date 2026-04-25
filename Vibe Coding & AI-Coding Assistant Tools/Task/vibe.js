//implement the quick sort algorithm
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      equal.push(arr[i]);
    }
  }
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// // Usage examples:
// console.log(quickSort([64, 34, 25, 12, 22, 11, 90]));
// // Output: [11, 12, 22, 25, 34, 64, 90]

// console.log(quickSort([5, 2, 8, 1, 9, 3]));
// // Output: [1, 2, 3, 5, 8, 9]

// console.log(quickSort(["banana", "apple", "cherry", "date"]));
// // Output: ["apple", "banana", "cherry", "date"]

// ===================== QUICK SORT =====================
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [],
    right = [],
    equal = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else if (arr[i] > pivot) right.push(arr[i]);
    else equal.push(arr[i]);
  }
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// ===================== MERGE SORT =====================
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// ===================== HEAP SORT =====================
function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// ===================== TEST ALL =====================
const testArr = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];

console.log("Original222:", testArr);
console.log("Original11:", [...testArr]);
console.log("Original11:", ...testArr);
console.log("QuickSort:", quickSort([...testArr]));
console.log("MergeSort:", mergeSort([...testArr]));
console.log("HeapSort:", heapSort([...testArr]));
console.log(
  "Built-in:",
  [...testArr].sort((a, b) => a - b),
);
