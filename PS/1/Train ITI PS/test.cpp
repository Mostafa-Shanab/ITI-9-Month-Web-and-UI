#include <iostream>

using namespace std;

int main()
{
  int size1, size2;

  cin >> size1 >> size2;
  int *cities = new int[size1];
  int *cellulars = new int[size2];

  for (int i = 0; i < size1; i++)
    cin >> cities[i];
  for (int i = 0; i < size2; i++)
    cin >> cellulars[i];

  int r = -1;
  for (int i = 0; i < size1; i++)
  {
    int currentr = abs(cities[i] - cellulars[0]);
    for (int j = 0; j < size2; j++)
    {
      if (currentr > abs(cities[i] - cellulars[j]))
      {
        currentr = abs(cities[i] - cellulars[j]);
      }
    }
    if (r < currentr)
    {
      r = currentr;
    }
  }

  cout << r << endl;

  return 0;
}
