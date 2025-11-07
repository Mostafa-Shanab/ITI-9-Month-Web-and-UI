#include <iostream>
#include <string>

using namespace std;

int main()
{
  string name, city;
  int age;

  cout << "Name : ";
  getline(cin, name);

  cout << "City : ";
  getline(cin, city);

  cout << "Age : ";
  cin >> age;

  cout << "Name : " << name << endl;
  cout << "City : " << city << endl;
  cout << "Age : " << age << endl;
  return 0;
}