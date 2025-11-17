#include <iostream>
using namespace std;

//==================== Base Class ====================
class Base
{
protected:
  int baseValue;

public:
  Base(int val = 0) : baseValue(val)
  {
    cout << "Base constructor called\n";
  }

  void showBase() const
  {
    cout << "Base value: " << baseValue << endl;
  }

  void greet() const
  {
    cout << "Hello from Base class\n";
  }

  ~Base()
  {
    cout << "Base destructor called\n";
  }
};

//==================== Derived Class ====================
class Derived : public Base
{
private:
  int derivedValue;

public:
  Derived(int bVal, int dVal) : Base(bVal), derivedValue(dVal)
  {
    cout << "Derived constructor called\n";
  }

  void showDerived() const
  {
    cout << "Derived value: " << derivedValue << endl;
  }

  void greet() const
  { // This hides Base::greet
    cout << "Hello from Derived class\n";
  }

  ~Derived()
  {
    cout << "Derived destructor called\n";
  }
};

//==================== MAIN ====================
int main()
{
  cout << "=== Base object ===\n";
  Base b(10);
  b.showBase();
  b.greet();

  cout << "\n=== Derived object ===\n";
  Derived d(20, 50);
  d.showBase();    // Inherited method
  d.showDerived(); // Derived method
  d.greet();       // Calls Derived::greet (hides Base::greet)

  cout << "\n=== Base pointer to Derived object ===\n";
  Base *ptr = &d;
  ptr->showBase(); // Works: calls Base method
  ptr->greet();    // Calls Base::greet, NOT Derived (no virtual!)
  cout << endl;
  return 0;
}
