#include <iostream>
#include <cstring> // for strlen
using namespace std;

int main()
{
  const int MAX_SIZE = 100;
  char line[MAX_SIZE];
  char *ptr = line; // pointer to the first character
  int length = 0;
  char choice;

  cout << "===== Simple Line Editor =====\n";

  // Step 1: Get initial input
  cout << "Enter initial text: ";
  cin.getline(line, MAX_SIZE);
  length = strlen(line);

  do
  {
    cin.get();
    system("cls");
    
    cout << "\nCurrent text: " << line << endl;
    cout << "Choose an operation:\n";
    cout << "1) Insert character\n";
    cout << "2) Delete character\n";
    cout << "3) Show text\n";
    cout << "4) Exit\n";
    cout << "Enter choice: ";
    cin >> choice;

    if (choice == '1')
    {
      int pos;
      char ch;
      cout << "Enter position (0 to " << length << "): ";
      cin >> pos;
      cout << "Enter character to insert: ";
      cin >> ch;

      if (pos >= 0 && pos <= length && length < MAX_SIZE - 1)
      {
        // Move pointer to insertion point
        ptr = line + length;
        // Shift elements to the right
        while (ptr >= line + pos)
        {
          *(ptr + 1) = *ptr;
          ptr--;
        }
        // Insert the new character
        *(line + pos) = ch;
        length++;
        line[length] = '\0'; // keep null terminator
      }
      else
      {
        cout << "Invalid position!\n";
      }
    }
    else if (choice == '2')
    {
      int pos;
      cout << "Enter position to delete (0 to " << length - 1 << "): ";
      cin >> pos;
      if (pos >= 0 && pos < length)
      {
        ptr = line + pos;
        while (*(ptr + 1) != '\0')
        {
          *ptr = *(ptr + 1); // shift left
          ptr++;
        }
        *ptr = '\0'; // update null terminator
        length--;
      }
      else
      {
        cout << "Invalid position!\n";
      }
    }
    else if (choice == '3')
    {
      cout << "Current text: " << line << endl;
    }

  } while (choice != '4');

  cout << "\nExiting Line Editor...\n";
  return 0;
}
