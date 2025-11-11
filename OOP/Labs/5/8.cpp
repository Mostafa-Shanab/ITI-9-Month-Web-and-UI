#include <iostream>
using namespace std;

int sum(int a, int b)
{
  return a + b;
}

int sum(int a, int b, int c)
{
  return a + b + c;
}

double sum(double a, double b)
{
  return a + b;
}

int main()
{
  cout << "Sum of 2 ints: " << sum(5, 10) << endl;
  cout << "Sum of 3 ints: " << sum(5, 10, 15) << endl;
  cout << "Sum of 2 doubles: " << sum(2.5, 3.7) << endl;

  return 0;
}
