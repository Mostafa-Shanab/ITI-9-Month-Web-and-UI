#include <iostream>
using namespace std;

class Complex
{
private:
  float real;
  float imag;
  inline static int counter = 0;

public:




  Complex() = default;  
  // Complex() : real(0), imag(0)
  // {
  //   counter++;
  //   cout << "Default constructor called.\n";
  // }

  Complex(float r)
  {
    real = r;
    imag = 0;
    counter++;
    cout << "One-parameter constructor called.\n";
  }

  Complex(float r, float i)
  {
    real = r;
    imag = i;
    counter++;
    cout << "Two-parameter constructor called.\n";
  }

  ~Complex()
  {
    counter--;
    cout << "Destructor called.\n";
  }

  static void showCounter()
  {
    cout << "Active Complex objects: " << counter << endl;
  }

  void printComplex() const
  {
    if (real == 0 && imag == 0)
      cout << 0;
    else if (imag == 0)
      cout << real;
    else if (real == 0)
    {
      if (imag == 1)
        cout << "i";
      else if (imag == -1)
        cout << "-i";
      else
        cout << imag << "i";
    }
    else
    {
      cout << real;
      if (imag > 0)
      {
        if (imag == 1)
          cout << "+i";
        else
          cout << "+" << imag << "i";
      }
      else
      {
        if (imag == -1)
          cout << "-i";
        else
          cout << imag << "i";
      }
    }
    cout << endl;
  }
};

int main()
{
  Complex c1;
  Complex::showCounter();

  Complex c2(5);
  Complex::showCounter();

  Complex c3(5, 7);
  Complex::showCounter();

  Complex c4(-3, -3);
  Complex c5(0, -8);
  Complex c6(0, 8);
  Complex c7(-9, 0);
  Complex c8(-9, 3);
  Complex c9(8, 1);
  Complex c10(8, -1);

  cout << "\nDisplaying Complex numbers:\n";
  c1.printComplex();
  c2.printComplex();
  c3.printComplex();  // 5+7i
  c4.printComplex();  // -3-3i
  c5.printComplex();  // -8i
  c6.printComplex();  // 8i
  c7.printComplex();  // -9
  c8.printComplex();  // -9+3i
  c9.printComplex();  // 8+i
  c10.printComplex(); // 8-i

  c3.showCounter();
  Complex::showCounter();

  return 0;
}
