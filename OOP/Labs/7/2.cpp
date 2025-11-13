#include <iostream>
using namespace std;

class Stack
{
  int *data;
  int top;
  int capacity;
  inline static int counter = 0;

public:
  Stack() = delete;

  Stack(int size = 5)
  {
    capacity = size;
    data = new int[capacity];
    top = 0;
    counter++;
    cout << "Stack created with capacity " << capacity << endl;
  }

  Stack(const Stack &other)
  {
    capacity = other.capacity;
    top = other.top;
    data = new int[capacity];
    for (int i = 0; i < top; i++)
      data[i] = other.data[i];
    counter++;
    cout << "Stack copied successfully (Copy Constructor).\n";
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
    cout << "Stack moved successfully (Move Constructor).\n";
  }

  Stack &operator=(const Stack &other)
  {
    if (this != &other)
    {
      delete[] data;
      capacity = other.capacity;
      top = other.top;
      data = new int[capacity];
      for (int i = 0; i < top; i++)
        data[i] = other.data[i];
    }
    cout << "Copy assignment done (= operator).\n";
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
    cout << "Move assignment done (Move = operator).\n";
    return *this;
  }

  int operator[](int index) const
  {
    if (index < 0 || index >= top)
    {
      cout << "Index out of range!\n";
      return -1;
    }
    return data[index];
  }

  ~Stack()
  {
    delete[] data;
    counter--;
    cout << "Stack destroyed. Remaining stacks: " << counter << endl;
  }

  Stack &push(int value)
  {
    if (top == capacity)
    {
      cout << "Stack Overflow! Cannot push " << value << endl;
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
      cout << "Stack is empty.\n";
      return;
    }
    cout << "Stack elements: ";
    for (int i = 0; i < top; i++)
      cout << data[i] << " ";
    cout << endl;
  }

  static void showCounter()
  {
    cout << "Number of Stack objects alive: " << counter << endl;
  }
};

int main()
{
  Stack s1(4);
  Stack s11(s1);
  s1.push(10).push(20).push(30);
  s1.showElements();

  cout << "Element at index 1: " << s1[1] << endl;

  Stack s2 = s1;
  Stack ss = move(s1);
  s1.showElements();
  s2.showElements();
  ss.showElements();
  Stack s3 = move(s1);
  s1.showElements();
  s3.showElements();

  Stack s4(2);
  s4 = s2;
  s4.showElements();
  s4 = move(s3);
  s4.showElements();

  Stack::showCounter();
  s1.showCounter();
  s2.showCounter();
  s3.showCounter();
  s4.showCounter();
  ss.showCounter();

  return 0;
}
