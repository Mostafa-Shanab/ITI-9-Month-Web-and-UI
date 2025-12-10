#include <iostream>
#include <string>
using namespace std;

class Employee
{
public:
  int ID;
  string Name;
  double Salary;

  Employee() : ID(0), Name(""), Salary(0.0) {}
  Employee(int id, string name, double salary) : ID(id), Name(name), Salary(salary) {}
};

class Node
{
public:
  Employee data;
  Node *left;
  Node *right;
  Node(Employee e) : data(e), left(nullptr), right(nullptr) {}
};

class BST
{
public:
  Node *root;

private:
  /////////////////////////////////////////////////////
  // 1️⃣ Insert Using Aliasing -> Node*& root
  /////////////////////////////////////////////////////
  void InsertAlias(Node *&node, Node *newNode)
  {
    if (node == nullptr)
    {
      node = newNode;
      return;
    }

    if (newNode->data.ID < node->data.ID)
      InsertAlias(node->left, newNode);
    else if (newNode->data.ID > node->data.ID)
      InsertAlias(node->right, newNode);
    else
    {
      cout << "❌ Duplicate ID Not Allowed: " << newNode->data.ID << endl;
      return;
    }

    node = Rebalance(node);
  }

  /////////////////////////////////////////////////////
  // 2️⃣ Insert Using Two Pointers -> (node, parent)
  /////////////////////////////////////////////////////
  void InsertTwoPointers(Node *cur_node, Node *parent, Node *newNode)
  {
    if (cur_node == nullptr)
    {
      if (newNode->data.ID < parent->data.ID)
        parent->left = newNode;
      else
        parent->right = newNode;
      return;
    }

    if (newNode->data.ID < cur_node->data.ID)
      InsertTwoPointers(cur_node->left, cur_node, newNode);
    else if (newNode->data.ID > cur_node->data.ID)
      InsertTwoPointers(cur_node->right, cur_node, newNode);
    else
    {
      cout << "❌ Duplicate ID Not Allowed: " << newNode->data.ID << endl;
    }
  }

  /////////////////////////////////////////////////////
  // Traversal (Inorder)
  /////////////////////////////////////////////////////
  void InOrder(Node *node)
  {
    if (!node)
      return;
    InOrder(node->left);
    cout << "ID: " << node->data.ID << " | Name: " << node->data.Name << " | Salary: " << node->data.Salary << endl;
    InOrder(node->right);
  }

  /////////////////////////////////////////////////////
  // Node Count
  /////////////////////////////////////////////////////
  int CountNodes(Node *node)
  {
    if (!node)
      return 0;
    return 1 + CountNodes(node->left) + CountNodes(node->right);
  }

  /////////////////////////////////////////////////////
  // Height (Levels)
  /////////////////////////////////////////////////////
  int Height(Node *node)
  {
    if (!node)
      return 0;
    int l = Height(node->left);
    int r = Height(node->right);
    return 1 + max(l, r);
  }

public:
  BST() : root(nullptr) {}

  Node *SearchTree(Node *pRoot, int Key)
  {
    if (pRoot != nullptr)
    {
      if (Key == pRoot->data.ID) /// Found
        return pRoot;
      else if (Key < pRoot->data.ID) /// Go Left
        return SearchTree(pRoot->left, Key);
      else /// Go Right
        return SearchTree(pRoot->right, Key);
    }
    return nullptr;
  }
  /////////////////////////////////////////
  // 🚀 Public Insert - Aliasing (default)
  /////////////////////////////////////////
  void Insert(Employee e)
  {
    Node *newNode = new Node(e);

    if (root == nullptr)
    {
      root = newNode;
      return;
    }
    InsertAlias(root, newNode);
  }

  /////////////////////////////////////////
  // Optionally use Two-Pointer Insert
  /////////////////////////////////////////
  void InsertUsingTwoPointers(Employee e)
  {
    Node *newNode = new Node(e);

    if (root == nullptr)
    {
      root = newNode;
      return;
    }
    InsertTwoPointers(root, nullptr, newNode);
  }

  void PrintInOrder()
  {
    cout << "\n--- Employees Sorted by ID (Inorder Traversal) ---\n";
    InOrder(root);
    cout << "------------------------------------------------\n";
  }

  int TotalNodes()
  {
    return CountNodes(root);
  }

  int Levels()
  {
    return Height(root);
  }

  bool RemoveNode(Node *&root, int id)
  {
    if (root == nullptr)
      return false;

    if (id < root->data.ID)
      return RemoveNode(root->left, id);
    else if (id > root->data.ID)
      return RemoveNode(root->right, id);
    else
      return DeleteNode(root); // Found the node
  }

  bool DeleteNode(Node *&node)
  {
    if (node == nullptr)
      return false;

    // No child
    if (node->left == nullptr && node->right == nullptr)
    {
      delete node;
      node = nullptr;
    }
    // One right child
    else if (node->left == nullptr)
    {
      Node *temp = node;
      node = node->right;
      delete temp;
    }
    // One left child
    else if (node->right == nullptr)
    {
      Node *temp = node;
      node = node->left;
      delete temp;
    }
    // Two children
    else
    {
      Node *maxNode = FindMax(node->left);
      node->data = maxNode->data;
      RemoveNode(node->left, maxNode->data.ID);
    }

    if (node != nullptr)
      node = Rebalance(node);

    return true;
  }

  Node *FindMax(Node *root)
  {
    while (root->right != nullptr)
      root = root->right;
    return root;
  }

  int getHeight(Node *node)
  {
    return (node == nullptr) ? 0 : Height(node);
  }

  int getBalance(Node *node)
  {
    if (node == nullptr)
      return 0;
    return getHeight(node->left) - getHeight(node->right);
  }

  Node *RotateRight(Node *&y)
  {
    Node *x = y->left;
    Node *T2 = x->right;

    x->right = y;
    y->left = T2;

    return x; // New root
  }

  Node *RotateLeft(Node *&x)
  {
    Node *y = x->right;
    Node *T2 = y->left;

    y->left = x;
    x->right = T2;

    return y; // New root
  }

  Node *Rebalance(Node *&node)
  {
    if (node == nullptr)
      return node;

    int balance = getBalance(node);

    // Case LL (Left Left)
    if (balance > 1 && getBalance(node->left) >= 0)
    {
      return RotateRight(node);
    }

    // Case LR (Left Right)
    if (balance > 1 && getBalance(node->left) < 0)
    {
      node->left = RotateLeft(node->left);
      return RotateRight(node);
    }

    // Case RR (Right Right)
    if (balance < -1 && getBalance(node->right) <= 0)
    {
      return RotateLeft(node);
    }

    // Case RL (Right Left)
    if (balance < -1 && getBalance(node->right) > 0)
    {
      node->right = RotateRight(node->right);
      return RotateLeft(node);
    }

    return node;
  }
};

// ------------------------ MAIN ------------------------
int main()
{
  BST tree;

  cout << "\n========== AVL TREE INSERT TEST ==========\n";

  // 🌳 Insert Test Data
  tree.Insert(Employee(100, "Shanab", 5000));
  tree.Insert(Employee(50, "Mona", 6000));
  tree.Insert(Employee(150, "Sara", 7000));
  tree.Insert(Employee(75, "Omar", 8000));
  tree.Insert(Employee(25, "Ali", 5500));
  tree.Insert(Employee(125, "Hana", 6500));
  tree.Insert(Employee(175, "Ahmed", 9000));

  cout << "\nInitial Tree (Self-balanced):\n";
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🔥 Test Insert Heavy Left (require LL rotation)
  cout << "\nInsert 10 -> Testing Left-Left Rotation...\n";
  tree.Insert(Employee(10, "Test LL", 4000));
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🔥 Test Insert Heavy Right (Require RR rotation)
  cout << "\nInsert 200 -> Testing Right-Right Rotation...\n";
  tree.Insert(Employee(200, "Test RR", 4500));
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🔥 Test LR Rotation case
  cout << "\nInsert 60 -> Testing Left-Right Rotation...\n";
  tree.Insert(Employee(60, "Test LR", 4700));
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🔥 Test RL Rotation case
  cout << "\nInsert 140 -> Testing Right-Left Rotation...\n";
  tree.Insert(Employee(140, "Test RL", 4800));
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  cout << "\n========== AVL TREE DELETE TEST ==========\n";

  // 🧪 Leaf Node Delete
  cout << "\nDelete Leaf (10)...\n";
  tree.RemoveNode(tree.root, 10);
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🧪 Node With One Child Delete
  cout << "\nDelete Node with One Child (75)...\n";
  tree.RemoveNode(tree.root, 75);
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  // 🧪 Node With Two Children Delete
  cout << "\nDelete Node with Two Children (100)...\n";
  tree.RemoveNode(tree.root, 100);
  tree.PrintInOrder();
  cout << "Tree Height: " << tree.Levels() << endl;

  cout << "\n========== FINAL TREE STATUS ==========\n";
  cout << "Total Employees: " << tree.TotalNodes() << endl;
  cout << "Final Tree Height: " << tree.Levels() << endl;

  return 0;
}
