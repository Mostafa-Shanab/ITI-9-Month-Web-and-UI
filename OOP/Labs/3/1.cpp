#include <iostream>
#include <conio.h> // for _getch()

using namespace std;

// ANSI color codes
#define RESET "\033[0m"
#define RED "\033[31m"
#define GREEN "\033[32m"
#define YELLOW "\033[33m"
#define BLUE "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN "\033[36m"
#define WHITE "\033[37m"
#define BOLDRED "\033[1;31m"
#define BOLDWHITE "\033[1;37m"

// Function declarations
void newEmployee();
void displayEmployee();
void displayAll();

int main()
{
  int choice = 0;
  const int totalOptions = 4;
  string menu[totalOptions] = {"New Employee", "Display Employee", "Display All", "Exit"};

  while (true)
  {
    system("cls");
    cout << BOLDWHITE << "==== Employee Management System ====\n\n"
         << RESET;

    // Display menu
    for (int i = 0; i < totalOptions; i++)
    {
      if (i == choice)
        cout << BOLDRED << ">> " << menu[i] << " <<" << RESET << endl;
      else
        cout << WHITE << "   " << menu[i] << RESET << endl;
    }

    // Handle key input
    int key = _getch();
    if (key == 224)
    { // Extended key prefix (arrows)
      key = _getch();
      if (key == 72)
        choice = (choice - 1 + totalOptions) % totalOptions; // Up
      else if (key == 80)
        choice = (choice + 1) % totalOptions; // Down
    }
    else if (key == 13)
    { // Enter key
      system("cls");
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
        cout << GREEN << "Exiting..." << RESET << endl;
        return 0;
      }
      cout << "\nPress any key to return to the menu...";
      _getch();
    }
    else if (key == 27)
    { // ESC key
      system("cls");
      cout << GREEN << "Exiting..." << RESET << endl;
      break; // exit the while loop
    }
  }
  return 0;
}

// Add new employee
void newEmployee()
{
  cout << "Entered New" << endl;
}

// Display one employee by ID
void displayEmployee()
{
  cout << "Entered Display" << endl;
}

// Display all employees
void displayAll()
{
  cout << "Entered Display ALL" << endl;
}
