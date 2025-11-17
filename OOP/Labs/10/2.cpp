#include <iostream>
using namespace std;

class Complex
{
public:
  double real, imag;

  Complex(double r = 0, double i = 0) : real(r), imag(i) {}

  // Operator+ for adding two Complex numbers
  Complex operator+(const Complex &other) const
  {
    return Complex(real + other.real, imag + other.imag);
  }

  // Overload << for printing
  friend ostream &operator<<(ostream &out, const Complex &c)
  {
    out << "(" << c.real << " + " << c.imag << "i)";
    return out;
  }
};

// Generic sum function
template <typename T>
T sum(T a, T b)
{
  return a + b;
}

int main()
{
  // Integers
  int i1 = 5, i2 = 10;
  cout << "Sum of ints: " << sum(i1, i2) << endl;

  // Floats
  float f1 = 1.5, f2 = 2.7;
  cout << "Sum of floats: " << sum(f1, f2) << endl;

  // Doubles
  double d1 = 3.14, d2 = 2.87;
  cout << "Sum of doubles: " << sum(d1, d2) << endl;

  // Complex numbers
  Complex c1(1, 2), c2(3, 4);
  cout << "Sum of Complex: " << sum(c1, c2) << endl;

  return 0;
}
