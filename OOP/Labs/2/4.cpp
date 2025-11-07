#include <iostream>

using namespace std;

int main()
{
  float score;
  cout << "Enter Score : ";
  cin >> score;

  if (score >= 85 && score <= 100)
  {
    cout << "Grade : A";
  }
  else if (score >= 75 && score < 85)
  {
    cout << "Grade : B";
  }
  else if (score >= 60 && score < 75)
  {
    cout << "Grade : C";
  }
  else if (score < 60)
  {
    cout << "Grade : F";
  }
  else if (score > 100)
  {
    cout << "Grade : A+";
  }

  return 0;
}