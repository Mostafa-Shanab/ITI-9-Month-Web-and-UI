#include <iostream>
using namespace std;

void swap(int &x, int &y)
{
  int temp = x;
  x = y;
  y = temp;
}
void bubbleSort(int *arr, int n)
{
  bool isSorted = false;
  for (int i = 0; ((i < n - 1) && (!isSorted)); i++)
  {
    isSorted = true;
    for (int j = 0; j < n - i - 1; j++)
    {
      if (arr[j] > arr[j + 1])
      {
        isSorted = false;
        swap(arr[j], arr[j + 1]);
      }
    }
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
  int arr[] = {6, 4, 2, 9, 1};
  int n = sizeof(arr) / sizeof(arr[0]);

  printArray(arr, n);
  bubbleSort(arr, n);
  printArray(arr, n);

  return 0;
}
