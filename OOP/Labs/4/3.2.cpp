#include <iostream>
using namespace std;

void decimalToBinary(int n)
{
  if (n <= 0)
    return;

  decimalToBinary(n / 2);
  cout << n % 2;
}

int main()
{
  int n;
  cout << "Enter a decimal number: ";
  cin >> n;

  if (n == 0)
    cout << 0;
  else
    decimalToBinary(n);

  return 0;
}

// #include <iostream>
// using namespace std;

// int binaryToDecimal(int binary)
// {
//   if (binary == 0)
//     return 0;

//   int lastBit = binary % 10;

//   int remaining = binary / 10;

//   return binaryToDecimal(remaining) * 2 + lastBit;
// }

// int main()
// {
//   int binary;
//   cout << "Enter a binary number: ";
//   cin >> binary;

//   cout << "Decimal value: " << binaryToDecimal(binary) << endl;
//   return 0;
// }
