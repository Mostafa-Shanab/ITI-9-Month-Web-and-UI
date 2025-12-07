#include <iostream>
using namespace std;

int binarySearchIterative(int arr[], int n, int target)
{
  int left = 0, right = n - 1;

  while (left <= right)
  {
    int mid = left + (right - left) / 2;

    if (arr[mid] == target)
      return mid;
    else if (arr[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }
  return -1;
}

int binarySearchRecursive(int arr[], int left, int right, int target)
{
  if (left > right)
    return -1;

  int mid = left + (right - left) / 2;

  if (arr[mid] == target)
    return mid;
  else if (arr[mid] < target)
    return binarySearchRecursive(arr, mid + 1, right, target);
  else
    return binarySearchRecursive(arr, left, mid - 1, target);
}

int main()
{
  int arr[] = {1, 3, 5, 7, 9, 11, 13};
  int n = sizeof(arr) / sizeof(arr[0]);
  int target = 7;

  cout << "Iterative: Index = " << binarySearchIterative(arr, n, target) << endl;

  cout << "Recursive: Index = " << binarySearchRecursive(arr, 0, n - 1, target) << endl;

  return 0;
}
