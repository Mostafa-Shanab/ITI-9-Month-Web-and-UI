#include <iostream>
using namespace std;

// Function to heapify a subtree rooted at index i
void heapify(int arr[], int n, int i)
{
  int largest = i;       // Assume root is largest
  int left = 2 * i + 1;  // Left child index
  int right = 2 * i + 2; // Right child index

  // If left child is greater than root
  if (left < n && arr[left] > arr[largest])
    largest = left;

  // If right child is greater than current largest
  if (right < n && arr[right] > arr[largest])
    largest = right;

  // If largest is not root → swap and continue heapifying
  if (largest != i)
  {
    swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

// Main Heap Sort function
void heapSort(int arr[], int n)
{
  // Step 1: Build initial max heap
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);

  // Step 2: Extract max elements & heapify again
  for (int i = n - 1; i > 0; i--)
  {
    swap(arr[0], arr[i]); // Move current max to end
    heapify(arr, i, 0);   // Re-heapify reduced heap
  }
}

void printArray(int arr[], int n)
{
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  cout << endl;
}

int main()
{
  int arr[] = {4, 10, 3, 5, 1};
  int n = sizeof(arr) / sizeof(arr[0]);

  printArray(arr, n);
  heapSort(arr, n);
  printArray(arr, n);

  return 0;
}
