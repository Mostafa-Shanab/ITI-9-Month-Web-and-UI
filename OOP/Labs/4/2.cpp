#include <iostream>
#include <array>
using namespace std;

void replaceHalf(int arr[], int size)
{
  int mid = size / 2;
  for (int i = 0; i < size; i++)
    if (i < mid)
      arr[i] = 1;
    else
      arr[i] = 0;
}

void replaceHalf1(array<int, 9> &arr, int size)
{ // <-- & here
  int mid = size / 2;
  for (int i = 0; i < size; i++)
    arr[i] = (i < mid) ? 1 : 0;
}

int main()
{
  int arr[] = {5, 8, 9, 3, 7, 2, 3, 3};
  int size = sizeof(arr) / sizeof(arr[0]);
  cout << size << endl;

  array<int, 9> arr1 = {5, 8, 9, 3, 7, 2, 3, 3, 4};
  int size1 = arr1.size();
  cout << size1 << endl;

  replaceHalf(arr, size);
  replaceHalf1(arr1, size1);

  cout << "Modified array: ";
  for (int x : arr)
    cout << x << " ";
  cout << endl;

  cout << "Modified array1: ";
  for (int x : arr1)
    cout << x << " ";
  cout << endl;

  return 0;
}
