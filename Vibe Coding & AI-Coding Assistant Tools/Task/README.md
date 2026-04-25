# Sorting Algorithms Documentation

This project contains implementations and comparisons of popular sorting algorithms.

## 📚 Table of Contents

- [QuickSort](#quicksort)
- [MergeSort](#mergesort)
- [HeapSort](#heapsort)
- [Comparison](#comparison)
- [Stability](#stability)

---

## QuickSort

### Algorithm Explanation

QuickSort is a **divide-and-conquer** algorithm that works by selecting a "pivot" element and partitioning the array around it.

### How It Works

```
1. Base Case: If array has 1 or 0 elements, return it (already sorted)
2. Choose Pivot: Select the middle element as pivot
3. Partition: Split array into 3 parts:
   - left: elements < pivot
   - equal: elements = pivot
   - right: elements > pivot
4. Recurse: Recursively sort left and right arrays
5. Combine: Merge sorted left + equal + sorted right
```

### Implementation

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
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
```

### Time & Space Complexity

| Case    | Time Complexity | Space Complexity |
| ------- | --------------- | ---------------- |
| Best    | O(n log n)      | O(log n)         |
| Average | O(n log n)      | O(log n)         |
| Worst   | O(n²)           | O(n)             |

---

## MergeSort

### Algorithm Explanation

MergeSort is a **stable**, divide-and-conquer algorithm that divides the array in half, sorts each half, then merges them back together.

### Implementation

```javascript
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
```

### Time & Space Complexity

| Case    | Time Complexity | Space Complexity |
| ------- | --------------- | ---------------- |
| Best    | O(n log n)      | O(n)             |
| Average | O(n log n)      | O(n)             |
| Worst   | O(n log n)      | O(n)             |

---

## HeapSort

### Algorithm Explanation

HeapSort uses a binary heap data structure to sort elements. It builds a max-heap and repeatedly extracts the maximum element.

### Implementation

```javascript
function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
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
```

### Time & Space Complexity

| Case    | Time Complexity | Space Complexity |
| ------- | --------------- | ---------------- |
| Best    | O(n log n)      | O(1)             |
| Average | O(n log n)      | O(1)             |
| Worst   | O(n log n)      | O(1)             |

---

## Comparison

### Complexity Summary

| Algorithm    | Best       | Average    | Worst      | Space    | Stable |
| ------------ | ---------- | ---------- | ---------- | -------- | ------ |
| QuickSort    | O(n log n) | O(n log n) | O(n²)      | O(log n) | ❌     |
| MergeSort    | O(n log n) | O(n log n) | O(n log n) | O(n)     | ✅     |
| HeapSort     | O(n log n) | O(n log n) | O(n log n) | O(1)     | ❌     |
| Array.sort() | O(n log n) | O(n log n) | O(n log n) | O(log n) | ❌     |

### Pros & Cons

| Algorithm            | Pros                                          | Cons                         |
| -------------------- | --------------------------------------------- | ---------------------------- |
| **QuickSort**        | Fast in practice, in-place, low memory        | Unstable, worst-case O(n²)   |
| **MergeSort**        | Stable, guaranteed O(n log n)                 | Extra memory O(n)            |
| **HeapSort**         | In-place, guaranteed O(n log n), no recursion | Not stable, cache-unfriendly |
| **Built-in .sort()** | Optimized (Timsort), easy to use              | Not stable                   |

### When to Use Each

| Algorithm            | Best Use Case                                         |
| -------------------- | ----------------------------------------------------- |
| **QuickSort**        | General purpose, in-memory sorting                    |
| **MergeSort**        | Linked lists, external sorting, when stability needed |
| **HeapSort**         | Memory-constrained environments                       |
| **Built-in .sort()** | Most JavaScript projects                              |

---

## Stability

### What is Stability?

A **stable** sorting algorithm preserves the relative order of elements that have equal values.

### Example

```javascript
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 25 }, // Same age as Alice
  { name: "Charlie", age: 30 },
];

// After STABLE sort by age:
// Alice (25) comes BEFORE Bob (25) ✓

// After UNSTABLE sort by age:
// Bob (25) might come BEFORE Alice (25) ✗
```

### Stability by Algorithm

| Algorithm    | Stable? |
| ------------ | ------- |
| QuickSort    | ❌ No   |
| MergeSort    | ✅ Yes  |
| HeapSort     | ❌ No   |
| Array.sort() | ❌ No   |

---

## Usage Examples

```javascript
const testArr = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];

// QuickSort (returns new array)
quickSort([...testArr]);
// Output: [5, 11, 12, 22, 25, 30, 34, 64, 77, 90]

// MergeSort (returns new array)
mergeSort([...testArr]);
// Output: [5, 11, 12, 22, 25, 30, 34, 64, 77, 90]

// HeapSort (modifies in place)
heapSort([...testArr]);
// Output: [5, 11, 12, 22, 25, 30, 34, 64, 77, 90]

// Built-in sort
[...testArr].sort((a, b) => a - b);
// Output: [5, 11, 12, 22, 25, 30, 34, 64, 77, 90]
```

---

## Why `[...arr]` Instead of Just `arr`?

Using `[...arr]` creates a **shallow copy** of the array to avoid mutating the original:

```javascript
const original = [3, 1, 2];
const copy = [...original];

copy[0] = 99;
console.log(original); // [3, 1, 2] — unchanged ✅
console.log(copy); // [99, 1, 2]
```

---

## Files

| File         | Description                                    |
| ------------ | ---------------------------------------------- |
| `vibe.js`    | Contains all sorting algorithm implementations |
| `index.html` | Web interface for QuickSort visualization      |
| `README.md`  | This documentation file                        |

---

## References

- [QuickSort - Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
- [MergeSort - Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
- [HeapSort - Wikipedia](https://en.wikipedia.org/wiki/Heapsort)
- [JavaScript Array.sort() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
