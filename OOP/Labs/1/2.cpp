#include <iostream>

using namespace std;

int main()
{
  int num1, num2;

  cout << "First Num : ";
  cin >> num1;
  cout << "Second Num : ";
  cin >> num2;

  cout << "Sum : " << num1 + num2 << endl;
  cout << "Difference : " << abs(num1 - num2) << endl;
  cout << "Average : " << (float(num1) + num2) / 2 << endl;
  return 0;
}