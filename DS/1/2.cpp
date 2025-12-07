#include <iostream>
using namespace std;

void mergeParts(int arr[], int leftStart, int mid, int rightEnd)
{
  int size = rightEnd - leftStart + 1;
  int *temp = new int[size];

  int left = leftStart;
  int right = mid + 1;
  int index = 0;

  while (left <= mid && right <= rightEnd)
  {
    if (arr[left] <= arr[right])
    {
      temp[index++] = arr[left++];
    }
    else
    {
      temp[index++] = arr[right++];
    }
  }

  while (left <= mid)
    temp[index++] = arr[left++];

  while (right <= rightEnd)
    temp[index++] = arr[right++];

  for (int i = 0; i < size; i++)
  {
    arr[leftStart + i] = temp[i];
  }

  delete[] temp;
}

void mergeSort(int arr[], int leftStart, int rightEnd)
{
  if (leftStart >= rightEnd)
    return;

  int mid = leftStart + (rightEnd - leftStart) / 2;

  mergeSort(arr, leftStart, mid);
  mergeSort(arr, mid + 1, rightEnd);

  mergeParts(arr, leftStart, mid, rightEnd);
}

void printArray(int arr[], int n)
{
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  cout << endl;
}

int main()
{
  int arr[] = {9, 4, 7, 2, 6, 1, 8};
  int n = sizeof(arr) / sizeof(arr[0]);

  printArray(arr, n);
  mergeSort(arr, 0, n - 1);
  printArray(arr, n);

  return 0;
}
