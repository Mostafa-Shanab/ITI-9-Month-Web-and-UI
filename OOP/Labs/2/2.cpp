#include <iostream>

using namespace std;

int main()
{
  char choice;
  int num1, num2, res;
  cout << "Enter First Num : ";
  cin >> num1;
  cout << "Enter Second Num : ";
  cin >> num2;
  do
  {
    cout << "Enter Operation: ";
    cin >> choice;
    switch (choice)
    {
    case 'a':
      res = num1 + num2;
      cout << "Result : " << res << endl;
      break;
    case 'b':
      res = num1 - num2;
      cout << "Result : " << res << endl;
      break;
    case 'c':
      res = num1 * num2;
      cout << "Result : " << res << endl;
      break;
    case 'd':
      res = num1 / num2;
      cout << "Result : " << res << endl;
      break;
    default:
      break;
    }
  } while (choice != 'E' && choice != 'e');

  return 0;
}