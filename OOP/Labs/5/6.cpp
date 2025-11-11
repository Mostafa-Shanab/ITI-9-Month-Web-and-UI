// #include <iostream>
// using namespace std;

// int main()
// {
//   int value = 42;
//   int *ptr = &value;
//   int **ptrToPtr = &ptr;

//   cout << "Value: " << value << endl;
//   cout << "*ptr: " << *ptr << endl;
//   cout << "**ptrToPtr: " << **ptrToPtr << endl;

//   **ptrToPtr = 100;
//   cout << "New value: " << value << endl;

//   return 0;
// }

#include <iostream>
#include <memory>
using namespace std;

int main()
{
  auto value = make_shared<int>(42);
  shared_ptr<shared_ptr<int>> ptrToPtr = make_shared<shared_ptr<int>>(value);

  cout << "Value: " << *value << endl;
  cout << "**ptrToPtr: " << **ptrToPtr << endl;

  **ptrToPtr = 100;
  cout << "New value: " << *value << endl;

  return 0;
}
