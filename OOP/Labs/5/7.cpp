#include <iostream>
using namespace std;

struct Person
{
  string name;
  int age;

  void display()
  {
    cout << "Name: " << name << ", Age: " << age << endl;
  }
};

int main()
{
  Person p;
  p.name = "Shanab";
  p.age = 22;
  p.display();
}

#include <iostream>
using namespace std;

class Person
{
public: // <- make members accessible like in struct
  string name;
  int age;

  void display()
  {
    cout << "Name: " << name << ", Age: " << age << endl;
  }
};

int main()
{
  Person p;
  p.name = "Shanab";
  p.age = 22;
  p.display();
}
