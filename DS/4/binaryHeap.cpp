#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

template <typename T>
class BinaryHeap
{
private:
  vector<T> heap;

  int parent(int i) const { return (i - 1) / 2; }
  int left(int i) const { return 2 * i + 1; }
  int right(int i) const { return 2 * i + 2; }

  void heapifyUp(int index)
  {
    while (index > 0 && heap[index] < heap[parent(index)])
    {
      swap(heap[index], heap[parent(index)]);
      index = parent(index);
    }
  }

  void heapifyDown(int index)
  {
    int smallest = index;
    int l = left(index);
    int r = right(index);

    if (l < heap.size() && heap[l] < heap[smallest])
      smallest = l;

    if (r < heap.size() && heap[r] < heap[smallest])
      smallest = r;

    if (smallest != index)
    {
      swap(heap[index], heap[smallest]);
      heapifyDown(smallest);
    }
  }

public:
  BinaryHeap() {}

  void Insert(const T &value)
  {
    heap.push_back(value);
    heapifyUp(heap.size() - 1);
  }

  T ExtractMin()
  {
    if (IsEmpty())
      throw runtime_error("Heap is empty");

    T root = heap[0];
    heap[0] = heap.back();
    heap.pop_back();

    if (!IsEmpty())
      heapifyDown(0);

    return root;
  }

  T Peek() const
  {
    if (IsEmpty())
      throw runtime_error("Heap is empty");

    return heap[0];
  }

  bool IsEmpty() const
  {
    return heap.empty();
  }

  int Size() const
  {
    return heap.size();
  }

  T operator[](int index) const
  {
    if (index < 0 || index >= heap.size())
      throw out_of_range("Index out of range");

    return heap[index];
  }

  void View() const
  {
    cout << "Heap State :" << endl;
    for (const T &x : heap)
      cout << x << " ";
    cout << endl;
  }
};

int main()
{
  BinaryHeap<int> h;

  h.Insert(40);
  h.Insert(10);
  h.Insert(30);
  h.Insert(5);
  h.Insert(20);
  h.View();

  cout << endl
       << h.ExtractMin() << endl;
  h.View();

  cout << endl
       << h.Peek() << endl;

  cout << endl
       << h[1] << endl;

  return 0;
}
