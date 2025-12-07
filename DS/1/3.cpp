#include <iostream>
using namespace std;

int linearSearchUnsorted(int arr[], int n, int target)
{
  for (int i = 0; i < n; i++)
  {
    if (arr[i] == target)
      return i;
  }
  return -1;
}

int linearSearchSorted(int arr[], int n, int target)
{
  for (int i = 0; i < n; i++)
  {
    if (arr[i] == target)
      return i;
    if (arr[i] > target)
      return -1;
  }
  return -1;
}

int main()
{
  int arr1[] = {7, 3, 9, 1, 6};
  int arr2[] = {1, 3, 5, 7, 9};
  int n = 5;
  int target = 7;

  cout << "Unsorted Search: Index = " << linearSearchUnsorted(arr1, n, target) << endl;

  cout << "Sorted Search: Index = " << linearSearchSorted(arr2, n, target) << endl;

  return 0;
}
