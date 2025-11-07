#include <iostream>
#include <array>
#include <conio.h>
using namespace std;

// ANSI colors and clear screen
#define RESET "\033[0m"
#define CYAN "\033[36m"
#define YELLOW "\033[33m"
#define WHITE "\033[37m"
#define BOLDWHITE "\033[1;37m"
#define CLEAR "\033[2J\033[H"

// Move cursor to (row, col)
void gotoxy(int row, int col)
{
  cout << "\033[" << row << ";" << col << "H";
}

int main()
{
  const int NUM_EMPLOYEES = 2;

  struct Employee
  {
    int id;
    string name;
    int age;
    double salary;
    string department;
  };
  array<Employee, NUM_EMPLOYEES> employees;

  for (int i = 0; i < NUM_EMPLOYEES; i++)
  {
    cout << CLEAR;
    cout << BOLDWHITE << "===== Employee Form (" << i + 1 << "/" << NUM_EMPLOYEES << ") =====" << RESET << "\n\n";

    // Layout: two columns
    cout << "ID:            ";
    gotoxy(3, 30);
    cout << "Name:";
    gotoxy(4, 1);
    cout << "Age:";
    gotoxy(4, 30);
    cout << "Salary:";
    gotoxy(5, 1);
    cout << "Department:";

    // Now enter values in correct positions
    gotoxy(3, 6);
    cout << YELLOW;
    cin >> employees[i].id;
    cout << RESET;
    gotoxy(3, 36);
    cout << YELLOW;
    cin >> employees[i].name;
    cout << RESET;
    gotoxy(4, 6);
    cout << YELLOW;
    cin >> employees[i].age;
    cout << RESET;
    gotoxy(4, 38);
    cout << YELLOW;
    cin >> employees[i].salary;
    cout << RESET;
    gotoxy(5, 13);
    cout << YELLOW;
    cin >> employees[i].department;
    cout << RESET;

    cout << CYAN << "\n\nEmployee " << i + 1 << " saved successfully!" << RESET;
    cout << "\nPress any key to continue...";
    _getch();
  }

  cout << CLEAR;
  cout << BOLDWHITE << "===== All Employees =====" << RESET << "\n\n";

  for (int i = 0; i < NUM_EMPLOYEES; i++)
  {
    cout << CYAN << "Employee #" << (i + 1) << RESET << "\n";
    cout << "ID: " << employees[i].id << "   Name: " << employees[i].name << "\n";
    cout << "Age: " << employees[i].age << "   Salary: " << employees[i].salary << "\n";
    cout << "Department: " << employees[i].department << "\n";
    cout << "--------------------------------\n";
  }

  return 0;
}
