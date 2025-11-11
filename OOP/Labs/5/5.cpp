#include <iostream>
#include <conio.h> // _getch()
using namespace std;

// ------------------- ANSI helpers -------------------
void gotoxy(int x, int y)
{
  cout << "\033[" << y << ";" << x << "H";
}

void clearScreen()
{
  cout << "\033[2J\033[H";
}

void setColor(const string &code)
{
  cout << code;
}

// ------------------- Word navigation -------------------

// Jump to start of all words (first non-space character)
int moveToLineStart(const char *line, int size)
{
  for (int i = 0; i < size; i++)
  {
    if (line[i] != ' ')
      return i;
  }
  return 0;
}

// Jump to end of all words (last non-space character)
int moveToLineEnd(const char *line, int size)
{
  for (int i = size - 1; i >= 0; i--)
  {
    if (line[i] != ' ')
      return i + 1;
  }
  return 0;
}

int main()
{
  const int width = 80;
  const int height = 25;
  const int centerX = width / 2;
  const int centerY = height / 2;
  const int lineLength = 30;

  // int size_of_line = 30;
  // cout << "Enter size of line";
  // cin >> size_of_line;
  // char* line = new char[size_of_line]; // dynamic size array
  // for (int i = 0; i < size_of_line; i++) line[i] = ' ';

  char line[lineLength]; // fixed size array
  for (int i = 0; i < lineLength; i++)
    line[i] = ' '; // initialize manually

  int cursorPos = 0;

  clearScreen();

  // Title
  setColor("\033[36m");
  gotoxy(centerX - 15, centerY - 2);
  cout << "=== Full Word Line Editor (char array) ===";
  setColor("\033[0m");

  gotoxy(centerX - 30, centerY + 2);
  cout << "Arrows move | HOME start of words | END end of words | DEL delete | ENTER/ESC finish";

  // Draw the fixed colored input line background
  gotoxy((width - lineLength) / 2, centerY);
  setColor("\033[44;97m"); // blue background + white text
  for (int i = 0; i < lineLength; i++)
    cout << line[i];
  setColor("\033[0m");

  while (true)
  {
    // Draw the line
    gotoxy((width - lineLength) / 2, centerY);
    setColor("\033[44;97m");
    for (int i = 0; i < lineLength; i++)
      cout << line[i];
    setColor("\033[0m");

    // Move cursor to correct position
    gotoxy((width - lineLength) / 2 + cursorPos, centerY);

    int key = _getch();

    if (key == 13 || key == 27)
      break; // ENTER or ESC finish

    if (key == 0 || key == 224)
    { // special keys
      key = _getch();
      switch (key)
      {
      case 75: // left arrow
        if (cursorPos > 0)
          cursorPos--;
        break;
      case 77: // right arrow
        if (cursorPos < lineLength)
          cursorPos++;
        break;
      case 71: // HOME → start of all words
        cursorPos = moveToLineStart(line, lineLength);
        break;
      case 79: // END → end of all words
        cursorPos = moveToLineEnd(line, lineLength);
        break;
      case 83: // DELETE → remove char after cursor
        if (cursorPos < lineLength)
        {
          for (int i = cursorPos; i < lineLength - 1; i++)
            line[i] = line[i + 1];
          line[lineLength - 1] = ' ';
        }
        break;
      }
    }
    else if (key == 8)
    { // BACKSPACE
      if (cursorPos > 0)
      {
        for (int i = cursorPos - 1; i < lineLength - 1; i++)
          line[i] = line[i + 1];
        line[lineLength - 1] = ' ';
        cursorPos--;
      }
    }
    else if (isprint(key))
    { // printable char → insert mode
      if (cursorPos < lineLength)
      {
        // shift chars right
        for (int i = lineLength - 1; i > cursorPos; i--)
          line[i] = line[i - 1];
        line[cursorPos] = (char)key;
        cursorPos++;
      }
    }
  }

  // Show final input
  clearScreen();
  setColor("\033[33m");
  gotoxy(centerX - 10, centerY);
  cout << "You typed:";
  setColor("\033[32m");
  gotoxy((width - lineLength) / 2, centerY + 1);
  for (int i = 0; i < lineLength; i++)
    cout << line[i];
  setColor("\033[0m");

  return 0;
}
