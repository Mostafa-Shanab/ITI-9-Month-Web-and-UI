#include <iostream>
using namespace std;

class Complex
{
private:
  double real;
  double imag;
  inline static int counter = 0;

public:
  // Complex() = default;

  Complex() : real(0), imag(0)
  {
    cout << "No parameter constructor (uniform init) called.\n";
    counter++;
  }

  Complex(double r, double i) : real(r), imag(i)
  {
    counter++;
    cout << "Two-parameter constructor (uniform init) called.\n";
  }

  Complex(double r) : real(r), imag(0)
  {
    counter++;
    cout << "One-parameter constructor called.\n";
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

  Complex operator+(Complex &other)
  {
    Complex res;
    res.real = this->real + other.real;
    res.imag = this->imag + other.imag;
    return res;
  }

  Complex operator*(Complex &other)
  {
    Complex res;
    res.real = this->real * other.real;
    res.imag = this->imag * other.imag;
    return res;
  }

  Complex operator/(const Complex &other) const
  {
    Complex res;

    if (other.real == 0 || other.imag == 0)
    {
      cout << "Cannot divide by 0\n";
      return {0, 0};
    }

    res.real = this->real / other.real;
    res.imag = this->imag / other.imag;
    return res;
  }

  bool operator<(const Complex &other) const
  {
    return ((this->real < other.real) && (this->imag < other.imag));
  }

  bool operator>(const Complex &other) const
  {
    return ((this->real > other.real) && (this->imag > other.imag));
  }

  // Prefix increment (++c)
  Complex &operator++()
  {
    real++;
    imag++;
    return *this;
  }

  // Postfix increment (c++)
  Complex operator++(int)
  {
    Complex temp = *this;
    real++;
    imag++;
    return temp;
  }

  // Prefix decrement (--c)
  Complex &operator--()
  {
    real--;
    imag--;
    return *this;
  }

  // Postfix decrement (c--)
  Complex operator--(int)
  {
    Complex temp = *this;
    real--;
    imag--;
    return temp;
  }

  explicit operator double() const
  {
    if (real == 0)
      return imag;
    if (imag == 0)
      return real;
    return real;
  }

  explicit operator bool() const
  {
    return !(real == 0 && imag == 0);
  }

  friend ostream &operator<<(ostream &out, const Complex &c)
  {
    if (c.real == 0 && c.imag == 0)
      out << 0;
    else if (c.imag == 0)
      out << c.real;
    else if (c.real == 0)
    {
      if (c.imag == 1)
        out << "i";
      else if (c.imag == -1)
        out << "-i";
      else
        out << c.imag << "i";
    }
    else
    {
      out << c.real;
      if (c.imag > 0)
      {
        if (c.imag == 1)
          out << "+i";
        else
          out << "+" << c.imag << "i";
      }
      else
      {
        if (c.imag == -1)
          out << "-i";
        else
          out << c.imag << "i";
      }
    }
    return out;
  }

  friend istream &operator>>(istream &in, Complex &c)
  {
    cout << "Enter real part: ";
    in >> c.real;
    cout << "Enter imaginary part: ";
    in >> c.imag;
    return in;
  }
};

int main()
{
  cout << "=== Constructors ===\n";
  Complex c1;
  Complex c2{3, 4};
  Complex c3(2);
  Complex::showCounter();

  cout << "\n=== Operator +, *, / ===\n";
  Complex sum = c2 + c3;
  Complex prod = c2 * c3;
  Complex div = c2 / c3;

  cout << "c2 = " << c2 << endl;
  cout << "c3 = " << c3 << endl;
  cout << "Sum = " << sum << endl;
  cout << "Product = " << prod << endl;
  cout << "Division = " << div << endl;

  cout << "\n=== Relational operators ===\n";
  cout << "c2 > c3 ? " << (c2 > c3 ? "True" : "False") << endl;
  cout << "c2 < c3 ? " << (c2 < c3 ? "True" : "False") << endl;

  cout << "\n=== Increment/Decrement ===\n";

  cout << "c2 before: " << c2 << endl;

  cout << "++c2 : " << ++c2 << endl;
  cout << "c2++ : " << c2++ << endl;

  cout << "c2--: " << c2-- << endl;
  cout << "--c2: " << --c2 << endl;

  cout << "\n=== Type Casting ===\n";
  cout << "Magnitude of c2: " << static_cast<double>(c2) << endl;
  cout << "Is c2 all are zero? " << (!static_cast<bool>(c2) ? "Yes" : "No") << endl;
  cout << "Is c all are zero? " << (!static_cast<bool>(c1) ? "Yes" : "No") << endl;

  cout << "\n=== Input Stream ===\n";
  Complex c4;
  cin >> c4;
  cout << "You entered: " << c4 << endl;

  Complex::showCounter();

  cout << "\n=== End of Program ===\n";
  return 0;
}
