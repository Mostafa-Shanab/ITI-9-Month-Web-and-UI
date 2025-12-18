#include <iostream>
#include <stdexcept>
using namespace std;

template <class T>
class DynamicArray
{
private:
  T *arr;
  int capacity;
  int size;

  void resize(int newCapacity)
  {
    T *newArr = new T[newCapacity];
    for (int i = 0; i < size; i++)
      newArr[i] = arr[i];

    delete[] arr;
    arr = newArr;
    capacity = newCapacity;
  }

public:
  // Constructor
  DynamicArray(int cap = 2)
  {
    capacity = cap;
    size = 0;
    arr = new T[capacity];
  }

  // Copy Constructor
  DynamicArray(const DynamicArray &other)
  {
    capacity = other.capacity;
    size = other.size;
    arr = new T[capacity];
    for (int i = 0; i < size; i++)
      arr[i] = other.arr[i];
  }

  // Copy Assignment Operator
  DynamicArray &operator=(const DynamicArray &other)
  {
    if (this == &other)
      return *this; // self-assignment check

    delete[] arr; // free old memory

    capacity = other.capacity;
    size = other.size;
    arr = new T[capacity];
    for (int i = 0; i < size; i++)
      arr[i] = other.arr[i];

    return *this;
  }

  // Destructor
  ~DynamicArray()
  {
    delete[] arr;
  }

  void PushBack(T value)
  {
    if (size == capacity)
      resize(capacity * 2);

    arr[size++] = value;
  }

  void Remove(T x)
  {
    for (int i = 0; i < size; i++)
    {
      if (arr[i] == x)
      {
        RemoveAt(i);
        return;
      }
    }
  }

  void RemoveAt(int index)
  {
    if (index < 0 || index >= size)
      return;

    for (int i = index; i < size - 1; i++)
      arr[i] = arr[i + 1];

    size--;

    if (size > 0 && size == capacity / 4)
      resize(capacity / 2);
  }

  T Get(int index) const
  {
    if (index < 0 || index >= size)
      throw out_of_range("Index out of range");

    return arr[index];
  }

  void Set(int index, T value)
  {
    if (index < 0 || index >= size)
      return;

    arr[index] = value;
  }

  int Size() const
  {
    return size;
  }

  bool IsEmpty() const
  {
    return size == 0;
  }

  void Print() const
  {
    for (int i = 0; i < size; i++)
      cout << arr[i] << " ";
    cout << endl;
  }
};

int main()
{
  DynamicArray<int> arr;

  arr.PushBack(10);
  arr.PushBack(20);
  arr.PushBack(30);

  arr.Print();
  cout << "Size: " << arr.Size() << endl;

  arr.Remove(20);
  arr.Print();

  arr.RemoveAt(0);
  arr.Print();
  cout << "Size: " << arr.Size() << endl;

  // Test Copy Constructor
  DynamicArray<int> copyArr(arr);
  copyArr.Print();

  // Test Copy Assignment Operator
  DynamicArray<int> assignArr;
  assignArr = arr;
  assignArr.Print();

  return 0;
}
