#include <iostream>
using namespace std;

void swapByAddress(int *x, int *y)
{
  int temp = *x;
  *x = *y;
  *y = temp;
}

void swapByReference(int &x, int &y)
{
  int temp = x;
  x = y;
  y = temp;
}

int main()
{
  int a = 10, b = 20;

  cout << "Before swapping:\n";
  cout << "a = " << a << ", b = " << b << "\n";

  swapByAddress(&a, &b);
  cout << "\nAfter swapByAddress:\n";
  cout << "a = " << a << ", b = " << b << "\n";

  swapByReference(a, b);
  cout << "\nAfter swapByReference:\n";
  cout << "a = " << a << ", b = " << b << "\n";

  return 0;
}
