#include <iostream>

using namespace std;

int main()
{

  int n;
  cout << "\033[36m Enter odd size for the magic box (3, 5, 7...): \033[0m";
  cin >> n;

  if (n < 3 || n % 2 == 0)
  {
    std::cout << "\033[31m Invalid! Please enter an odd number >= 3.\033[0m\n";
    return 1;
  }

  int magicSum = n * (n * n + 1) / 2;
  cout << "\n\033[33;1m Magic Box (" << n << "x" << n << ") \n";
  cout << "Magic Constant = " << magicSum << "\033[0m\n\n";

  for (int i = 0; i < n; ++i)
  {
    for (int j = 0; j < n; ++j)
    {
      int value = n * ((i + j - (n - 1) / 2 + n) % n) + ((i + 2 * j + 1) % n) + 1;

      string color;
      if (i == j)
        color = "\033[32m"; // green
      else
        color = "\033[35m"; // magenta

      cout << color << value << " \033[0m";
    }
    cout << "\n";
  }

  return 0;
}
