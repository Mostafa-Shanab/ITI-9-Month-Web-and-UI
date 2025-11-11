#include <iostream>
using namespace std;

int main()
{
  int size;

  cout << "Enter the number of elements: ";
  cin >> size;

  int arr[100] = {};

  //
  // int *ptr = arr;

  cout << "\nEnter " << size << " integers:\n";

  for (int i = 0; i < size; i++)
  {

    
    cout << "Element " << i + 1 << ": ";
    cin >> *(arr + i); 
  }

  cout << "\nArray elements are:\n";

  for (int i = 0; i < size * size * size; i++)
  {
    cout << "Element " << i + 1 << " = " << *(arr + i);
    cout << " (address: " << (arr + i) << ")\n";
  }

  cout<< *(arr) << endl;

  return 0;
}
