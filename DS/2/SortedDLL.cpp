#include <iostream>
#include <string>
using namespace std;

struct Employee
{
  int ID;
  string Name;
  double Salary;
};

class Node
{
public:
  Employee Data;
  Node *pNext;
  Node *pPrev;

  Node(const Employee &E) : Data(E), pNext(nullptr), pPrev(nullptr) {}
};

class SortedDLL
{
private:
  Node *pStart;
  Node *pLast;

public:
  SortedDLL() : pStart(nullptr), pLast(nullptr) {}

  SortedDLL(const SortedDLL &other) : pStart(nullptr), pLast(nullptr)
  {
    *this = other; // use deep copy
  }

  ~SortedDLL()
  {
    while (pStart)
      RemoveHead();
  }

  SortedDLL &operator=(const SortedDLL &other)
  {
    if (this == &other)
      return *this;

    while (pStart)
      RemoveHead();

    Node *curr = other.pStart;
    while (curr)
    {
      InsertNode(curr->Data);
      curr = curr->pNext;
    }
    return *this;
  }

  // ✔ Insert sorted by ID
  void InsertNode(const Employee &E)
  {
    Node *n = new Node(E);

    if (!pStart)
    { // first node
      pStart = pLast = n;
      return;
    }

    Node *curr = pStart;
    while (curr && curr->Data.ID < E.ID)
      curr = curr->pNext;

    if (!curr)
    { // insert at end
      pLast->pNext = n;
      n->pPrev = pLast;
      pLast = n;
    }
    else if (curr == pStart)
    { // insert at head
      n->pNext = pStart;
      pStart->pPrev = n;
      pStart = n;
    }
    else
    { // insert in middle
      n->pPrev = curr->pPrev;
      n->pNext = curr;
      curr->pPrev->pNext = n;
      curr->pPrev = n;
    }
  }

  Node *Search(int ID)
  {
    Node *curr = pStart;
    while (curr)
    {
      if (curr->Data.ID == ID)
        return curr;

      if (curr->Data.ID > ID) // Save Time (Because it is Sorted)
        return nullptr;
      curr = curr->pNext;
    }
    return nullptr;
  }

  bool RemoveHead()
  {
    if (!pStart)
      return false;
    Node *temp = pStart;
    pStart = pStart->pNext;
    if (pStart)
      pStart->pPrev = nullptr;
    else
      pLast = nullptr;
    delete temp;
    return true;
  }

  bool RemoveTail()
  {
    if (!pLast)
      return false;
    Node *temp = pLast;
    pLast = pLast->pPrev;
    if (pLast)
      pLast->pNext = nullptr;
    else
      pStart = nullptr;
    delete temp;
    return true;
  }

  bool DeleteNode(int ID)
  {
    Node *target = Search(ID);
    if (!target)
      return false;

    if (target == pStart)
      return RemoveHead();
    if (target == pLast)
      return RemoveTail();

    target->pPrev->pNext = target->pNext;
    target->pNext->pPrev = target->pPrev;

    delete target;
    return true;
  }

  int Count() const
  {
    int cnt = 0;
    Node *curr = pStart;
    while (curr)
    {
      cnt++;
      curr = curr->pNext;
    }
    return cnt;
  }

  void DisplayAll() const
  {
    Node *curr = pStart;
    while (curr)
    {
      cout << curr->Data.ID << " | " << curr->Data.Name << " | $" << curr->Data.Salary << endl;
      curr = curr->pNext;
    }
    cout << "--------------------------\n";
  }

  Node *operator[](int index)
  {
    Node *curr = pStart;
    int i = 0;
    while (curr && i < index)
    {
      curr = curr->pNext;
      i++;
    }
    return curr;
  }
};

// ======================= Testing Main =======================
int main()
{
  SortedDLL s;

  s.InsertNode({5, "Laila", 5000});
  s.InsertNode({2, "Adel", 7200});
  s.InsertNode({9, "Nada", 9000});
  s.InsertNode({1, "Hani", 8500});
  s.InsertNode({7, "Karim", 6600});

  cout << "Sorted List:\n";
  cout << "Sorted List:\n";
  s.DisplayAll();

  cout << "Count: " << s.Count() << endl;

  cout << "\nDeleting ID: 2\n";
  s.DeleteNode(2);
  s.DisplayAll();

  cout << "\nSearch ID 7: ";
  Node *n = s.Search(7);
  if (n)
    cout << n->Data.Name << endl;
  else
    cout << "Not found\n";

  cout << "\nElement at index 2: ";
  if (s[2])
    cout << s[2]->Data.Name << endl;

  return 0;
}
