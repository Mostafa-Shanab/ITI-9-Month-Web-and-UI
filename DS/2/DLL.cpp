
#include <iostream>

using namespace std;

struct Employee
{
  int ID;
  string Name;
  double Salary;

  Employee(int id = 0, string name = "", double salary = 0.0) : ID(id), Name(name), Salary(salary) {}
};

class Node
{
public:
  Employee data;
  Node *pNext;
  Node *pPrev;

  Node() : data(Employee()), pNext(nullptr), pPrev(nullptr) {}
  Node(const Employee &e) : data(e), pNext(nullptr), pPrev(nullptr) {}
  ~Node()
  {
    pNext = nullptr;
    pPrev = nullptr;
  }
};

class DLL
{
protected:
  Node *pStart;
  Node *pLast;
  int count;

  void clearAll()
  {
    Node *cur = pStart;
    while (cur)
    {
      Node *tmp = cur->pNext;
      delete cur;
      cur = tmp;
    }
    pStart = pLast = nullptr;
    count = 0;
  }

public:
  DLL() : pStart(nullptr), pLast(nullptr), count(0) {}

  // Copy Constructor (Deep Copy)
  DLL(DLL &other) : pStart(nullptr), pLast(nullptr), count(0)
  {
    Node *cur = other.pStart;
    while (cur)
    {
      AddNode(cur->data);
      cur = cur->pNext;
    }
  }

  // Assignment Operator (like Copy Constructor)
  DLL &operator=(DLL &other)
  {
    if (this == &other)
      return *this;
    clearAll(); // remove old data
    Node *cur = other.pStart;
    while (cur)
    {
      AddNode(cur->data);
      cur = cur->pNext;
    }
    return *this;
  }
  // operator[]: 0-based index -> returns Node* or nullptr if out of range
  Node *operator[](int index)
  {
    if (index < 0 || index >= count)
      return nullptr;
    Node *cur = pStart;
    int i = 0;
    while (cur && (i < index))
    {
      cur = cur->pNext;
      ++i;
    }
    return cur;
  }

  ~DLL()
  {
    clearAll();
  }

  // Remove head node in O(1)
  Employee RemoveHead()
  {
    if (!pStart)
      throw runtime_error("List is empty!");

    Node *tmp = pStart;
    Employee data = tmp->data;

    pStart = pStart->pNext;
    if (pStart)
      pStart->pPrev = nullptr;
    else
      pLast = nullptr; // list became empty

    delete tmp;
    count--;
    return data;
  }

  // Remove tail node in O(1)
  Employee RemoveTail()
  {
    if (!pLast)
      throw runtime_error("List is empty!");

    Node *tmp = pLast;
    Employee data = tmp->data;

    pLast = pLast->pPrev;
    if (pLast)
      pLast->pNext = nullptr;
    else
      pStart = nullptr; // list became empty

    delete tmp;
    count--;
    return data;
  }

  // ------------------------------------------------------------

  void AddNode(const Employee &e)
  {
    Node *n = new Node(e);
    if (!pStart)
    {
      pStart = pLast = n;
    }
    else
    {
      pLast->pNext = n;
      n->pPrev = pLast;
      pLast = n;
    }
    count++;
  }

  bool DeleteNode(int ID)
  {
    Node *cur = SearchList(ID);
    if (!cur)
      return false;

    if (cur == pStart)
    {
      RemoveHead();
      return true;
    }
    if (cur == pLast)
    {
      RemoveTail();
      return true;
    }

    cur->pPrev->pNext = cur->pNext;
    cur->pNext->pPrev = cur->pPrev;

    delete cur;
    count--;
    return true;
  }
  // Search by ID, return pointer or nullptr
  Node *SearchList(int ID)
  {
    Node *cur = pStart;
    while (cur)
    {
      if (cur->data.ID == ID)
        return cur;
      cur = cur->pNext;
    }
    return nullptr;
  }
  bool DisplayNode(int ID)
  {
    Node *n = SearchList(ID);
    if (!n)
      return false;
    cout << "ID: " << n->data.ID << " | Name: " << n->data.Name << " | Salary: " << n->data.Salary << '\n';
    return true;
  }
  // Display all nodes
  void DisplayALL()
  {
    if (!pStart)
    {
      cout << "[List is empty]\n";
      return;
    }
    cout << "List content (count = " << count << "):\n";
    Node *cur = pStart;
    while (cur)
    {
      cout << "  ID: " << cur->data.ID << " | Name: " << cur->data.Name << " | Salary: " << cur->data.Salary << '\n';
      cur = cur->pNext;
    }
  }

  int NodeCount() { return count; }
  // Expose start and last for derived classes if needed
  Node *start() const { return pStart; }
  Node *last() const { return pLast; }
};

// ------------------------ StackDLL (inherits DLL) ------------------------
class StackDLL : public DLL
{
public:
  StackDLL() : DLL() {}

  void Push(const Employee &e)
  {
    AddNode(e);
  }

  Employee Pop()
  {
    return RemoveTail(); // O(1)
  }

  Employee Peek()
  {
    if (!pLast)
      throw runtime_error("Stack is empty");
    return pLast->data;
  }
};
// ------------------------ Queue (inherits DLL) ------------------------
class Queue : public DLL
{
public:
  Queue() : DLL() {}

  void EnQ(const Employee &e)
  {
    AddNode(e);
  }

  Employee DeQ()
  {
    return RemoveHead(); // O(1)
  }

  Employee Peek()
  {
    if (!pStart)
      throw runtime_error("Queue is empty");
    return pStart->data;
  }
};

// ------------------------ Example usage / tests ------------------------
int main()
{
  cout << "=== DLL basic operations ===\n";
  DLL list;
  Employee e1(101, "Alice", 5100.25);
  list.AddNode(e1);
  list.AddNode(Employee(203, "Bob", 4300.50));
  list.AddNode(Employee(150, "Carol", 6200.00));
  list.DisplayALL();

  cout << "\nSearching for ID 203:\n";
  if (list.SearchList(203))
    list.DisplayNode(203);
  else
    cout << "Not found\n";

  cout << "\noperator[] test (index 1):\n";
  Node *idx1 = list[1];
  if (idx1)
    cout << "Index 1 -> ID: " << idx1->data.ID << " Name: " << idx1->data.Name << " Salary: " << idx1->data.Salary << '\n';

  cout << "\nCopying list into anotherList via copy ctor:\n";
  DLL anotherList(list);
  anotherList.DisplayALL();
  
  cout << "\nAssigning list to assignedList via operator=:\n";
  DLL assignedList;
  assignedList = list;
  assignedList.DisplayALL();
  list.DisplayALL();

  cout << "\nDeleting ID 150 from original list:\n";
  list.DeleteNode(150);
  list.DisplayALL();

  // cout << "\n=== SortedDLL operations ===\n";
  // SortedDLL sorted;
  // sorted.InsertNode(Employee(50, "Dave", 3000));
  // sorted.InsertNode(Employee(10, "Eve", 4000));
  // sorted.InsertNode(Employee(40, "Frank", 3500));
  // sorted.InsertNode(Employee(30, "Grace", 4500));
  // sorted.DisplayALL();

  cout << "\n=== StackDLL operations ===\n";
  StackDLL st;
  st.Push(Employee(1, "StackA", 1000));
  st.Push(Employee(2, "StackB", 2000));
  st.Push(Employee(3, "StackC", 3000));
  cout << "Stack peek top: " << st.Peek().Name << '\n';
  cout << "Pop: " << st.Pop().Name << '\n';
  cout << "After pop:\n";
  st.DisplayALL();

  cout << "\n=== Queue operations ===\n";
  Queue q;
  q.EnQ(Employee(11, "QueueA", 1100));
  q.EnQ(Employee(12, "QueueB", 1200));
  q.EnQ(Employee(13, "QueueC", 1300));
  cout << "Queue peek front: " << q.Peek().Name << '\n';
  cout << "DeQ: " << q.DeQ().Name << '\n';
  cout << "After DeQ:\n";
  q.DisplayALL();

  return 0;
}