#include <iostream>
using namespace std;

class Stack
{
private:
  int *data;
  int top;
  int capacity;
  static int counter;

public:
  Stack()
  {
    capacity = 10;
    data = new int[capacity];
    top = 0;
    counter++;
    cout << "\n\nShanab\n\n";
  }

  Stack(int size)
  {
    capacity = size;
    data = new int[capacity];
    top = 0;
    counter++;
  }

  ~Stack()
  {
    delete[] data;
    counter--;
    cout << "Stack destroyed successfully.\n";
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
    {
      cout << data[i] << " ";
    }
    cout << endl;
  }

  static void showCounter()
  {
    cout << "Number of Stack objects created: " << counter << endl;
  }
};

int Stack::counter = 0;

int main()
{
  Stack s1;
  Stack s2(3);

  s1.push(10).push(20).push(30);
  s1.showElements();

  s1.pop().showElements();

  s2.push(5).push(15);
  s2.showElements();

  s1.showCounter();
  s2.showCounter();
  Stack::showCounter();

  // Stack::Stack();

  return 0;
}
