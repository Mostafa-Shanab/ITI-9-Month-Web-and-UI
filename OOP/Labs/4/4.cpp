#include <iostream>
#include <string>
#include <array>
#include <conio.h> // for _getch()
using namespace std;

// ===== ANSI Colors and Utilities =====
#define RESET "\033[0m"
#define RED "\033[31m"
#define CYAN "\033[36m"
#define WHITE "\033[37m"
#define YELLOW "\033[33m"
#define BOLDWHITE "\033[1;37m"
#define CLEAR "\033[2J\033[H"

// ===== Constants =====
const int MAX_EMPLOYEES = 5;

// ===== Structures =====
struct Employee
{
  int id{};
  string name;
  int age{};
  double salary{};
  string department;
  bool exists = false; // to track if employee was added
};

// ===== Global Array =====
array<Employee, MAX_EMPLOYEES> employees;

// ===== Utility Function =====
void gotoxy(int row, int col)
{
  cout << "\033[" << row << ";" << col << "H";
}

// ===== Function Declarations =====
int menu();
void newEmployee();
void displayEmployee();
void displayAll();

// ===== Main Function =====
int main()
{
  while (true)
  {
    int choice = menu();

    switch (choice)
    {
    case 0:
      newEmployee();
      break;
    case 1:
      displayEmployee();
      break;
    case 2:
      displayAll();
      break;
    case 3:
      cout << CLEAR << CYAN << "Exiting program..." << RESET << endl;
      return 0;
    }
  }
}

// ===== Menu Function =====
int menu()
{
  int choice = 0;
  const int totalOptions = 4;
  string options[totalOptions] = {"New Employee", "Display Employee", "Display All", "Exit"};

  while (true)
  {
    cout << CLEAR;
    cout << BOLDWHITE << "===== Employee Management System =====" << RESET << "\n\n";

    for (int i = 0; i < totalOptions; i++)
    {
      if (i == choice)
        cout << RED << ">> " << options[i] << " <<" << RESET << endl;
      else
        cout << WHITE << "   " << options[i] << RESET << endl;
    }

    int key = _getch();
    if (key == 224)
    { // Arrow key prefix
      key = _getch();
      if (key == 72)
        choice = (choice - 1 + totalOptions) % totalOptions; // Up
      else if (key == 80)
        choice = (choice + 1) % totalOptions; // Down
    }
    else if (key == 13)
    { // Enter key
      return choice;
    }
    else if (key == 27)
    { // ESC to exit
      return 3;
    }
  }
}

// ===== New Employee Form =====
void newEmployee()
{
  cout << CLEAR;
  cout << BOLDWHITE << "===== Add New Employee =====" << RESET << "\n\n";
  cout << "Enter index (0-" << MAX_EMPLOYEES - 1 << "): ";
  int idx;
  cin >> idx;

  if (idx < 0 || idx >= MAX_EMPLOYEES)
  {
    cout << RED << "Invalid index!" << RESET << endl;
    _getch();
    return;
  }

  Employee emp;
  cout << CLEAR;
  cout << BOLDWHITE << "===== Employee Form (Index " << idx << ") =====" << RESET << "\n\n";

  cout << "ID: ";
  gotoxy(3, 30);
  cout << "Name:";
  gotoxy(4, 1);
  cout << "Age:";
  gotoxy(4, 30);
  cout << "Salary:";
  gotoxy(5, 1);
  cout << "Department:";

  gotoxy(3, 5);
  cin >> emp.id;
  gotoxy(3, 36);
  cin >> emp.name;
  gotoxy(4, 5);
  cin >> emp.age;
  gotoxy(4, 38);
  cin >> emp.salary;
  gotoxy(5, 13);
  cin >> emp.department;

  emp.exists = true;
  employees[idx] = emp;

  cout << CYAN << "\n\nEmployee saved successfully!" << RESET;
  cout << "\nPress any key to return to menu...";
  _getch();
}

// ===== Display One Employee =====
void displayEmployee()
{
  cout << CLEAR;
  cout << BOLDWHITE << "===== Display Employee by Index =====" << RESET << "\n\n";
  cout << "Enter index (0-" << MAX_EMPLOYEES - 1 << "): ";
  int idx;
  cin >> idx;

  if (idx < 0 || idx >= MAX_EMPLOYEES || !employees[idx].exists)
  {
    cout << RED << "No employee found at this index!" << RESET << endl;
  }
  else
  {
    Employee &e = employees[idx];
    cout << CYAN << "\nEmployee #" << idx << RESET << "\n";
    cout << "ID: " << e.id << "   Name: " << e.name << "\n";
    cout << "Age: " << e.age << "   Salary: " << e.salary << "\n";
    cout << "Department: " << e.department << "\n";
  }

  cout << "\nPress any key to return to menu...";
  _getch();
}

// ===== Display All Employees =====
void displayAll()
{
  cout << CLEAR;
  cout << BOLDWHITE << "===== All Employees =====" << RESET << "\n\n";

  bool found = false;
  for (int i = 0; i < MAX_EMPLOYEES; i++)
  {
    if (employees[i].exists)
    {
      found = true;
      Employee &e = employees[i];
      cout << CYAN << "Employee #" << i << RESET << "\n";
      cout << "ID: " << e.id << "   Name: " << e.name << "\n";
      cout << "Age: " << e.age << "   Salary: " << e.salary << "\n";
      cout << "Department: " << e.department << "\n";
      cout << "----------------------------------\n";
    }
  }

  if (!found)
    cout << RED << "No employees to display!" << RESET << endl;

  cout << "\nPress any key to return to menu...";
  _getch();
}
