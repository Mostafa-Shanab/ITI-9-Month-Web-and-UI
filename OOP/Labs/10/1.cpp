#include <iostream>
using namespace std;

//==================== Complex Class (for testing) ====================
class Complex
{
  float real, imag;

public:
  Complex(float r = 0, float i = 0) : real(r), imag(i) {}

  friend ostream &operator<<(ostream &out, const Complex &c)
  {
    out << "(" << c.real << " + " << c.imag << "i)";
    return out;
  }
};

//==================== Template Stack Class ====================
// template <typename T>
template <class T>
class Stack
{
  T *data;
  int top;
  int capacity;
  inline static int counter = 0;

public:
  Stack() = delete;

  Stack(int size)
  {
    capacity = size;
    data = new T[capacity];
    top = 0;
    counter++;
    cout << "Stack<" << typeid(T).name() << "> created.\n";
  }

  Stack(const Stack &other)
  {
    capacity = other.capacity;
    top = other.top;
    data = new T[capacity];
    for (int i = 0; i < top; i++)
      data[i] = other.data[i];
    counter++;
    cout << "Copy constructor called.\n";
  }

  Stack(Stack &&other) noexcept
  {
    capacity = other.capacity;
    top = other.top;
    data = other.data;
    other.data = nullptr;
    other.top = 0;
    other.capacity = 0;
    counter++;
    cout << "Move constructor called.\n";
  }

  Stack &operator=(const Stack &other)
  {
    if (this != &other)
    {
      delete[] data;
      capacity = other.capacity;
      top = other.top;
      data = new T[capacity];
      for (int i = 0; i < top; i++)
        data[i] = other.data[i];
    }
    cout << "Copy assignment called.\n";
    return *this;
  }

  Stack &operator=(Stack &&other) noexcept
  {
    if (this != &other)
    {
      delete[] data;
      capacity = other.capacity;
      top = other.top;
      data = other.data;
      other.data = nullptr;
      other.top = 0;
      other.capacity = 0;
    }
    cout << "Move assignment called.\n";
    return *this;
  }

  T operator[](int index) const
  {
    if (index < 0 || index >= top)
    {
      cout << "Index out of range!\n";
      return T{};
    }
    return data[index];
  }

  ~Stack()
  {
    delete[] data;
    counter--;
    cout << "Stack destroyed. Remaining: " << counter << endl;
  }

  Stack &push(T value)
  {
    if (top == capacity)
    {
      cout << "Stack Overflow!\n";
      return *this;
    }
    data[top++] = value;
    return *this;
  }

  Stack &pop()
  {
    if (top == 0)
    {
      cout << "Nothing to pop!\n";
      return *this;
    }
    cout << "Popped: " << data[--top] << endl;
    return *this;
  }

  void showElements() const
  {
    if (top == 0)
    {
      cout << "Stack is empty\n";
      return;
    }

    cout << "Elements: ";
    for (int i = 0; i < top; i++)
      cout << data[i] << " ";
    cout << endl;
  }

  static void showCounter()
  {
    cout << "Alive stacks: " << counter << endl;
  }
};

//==================== MAIN ====================
int main()
{
  cout << "\n==== Stack<int> ====\n";
  Stack<int> sint(5);
  sint.push(10).push(20).push(30);
  sint.showElements();

  cout << "\n==== Stack<float> ====\n";
  Stack<float> sfloat(4);
  sfloat.push(1.5).push(2.7).push(3.14);
  sfloat.showElements();

  cout << "\n==== Stack<char> ====\n";
  Stack<char> schar(4);
  schar.push('A').push('B').push('C');
  schar.showElements();

  cout << "\n==== Stack<Complex> ====\n";
  Stack<Complex> scomp(4);
  Stack<Complex> scomp2(4);
  scomp.push(Complex(1, 2)).push(Complex(3, 4));
  scomp.showElements();

  cout << "\n==== Testing Copy & Move ====\n";
  Stack<int> s2 = sint;       // copy
  Stack<int> s3 = move(sint); // move
  sint.showElements();
  s2.showElements();
  s3.showElements();

  cout << "\n==== Testing Assignment ====\n";
  Stack<int> s4(3);
  s4 = s2;       // copy assignment
  s4 = move(s3); // move assignment
  s4.showElements();

  cout << "\n==== Final Counter ====\n";
  // Stack::showCounter();
  Stack<Complex>::showCounter();

  return 0;
}
