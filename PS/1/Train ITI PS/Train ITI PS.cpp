#include <iostream>

using namespace std;

int main()
{
    string originalString, secondString, thirdString;
    cin >> originalString >> secondString >> thirdString;

    string smallerOne, largerOne;
    if (secondString.size() < thirdString.size())
    {
        smallerOne = secondString;
        largerOne = thirdString;
    }
    else
    {
        smallerOne = thirdString;
        largerOne = secondString;
    }

    string newString = "";

    for (int i = 0; i < smallerOne.size(); i++)
    {
        char currentChar = smallerOne.at(i);
        for (int j = 0; j < originalString.size(); j++)
        {
            if (currentChar == originalString.at(j)) {
                newString += currentChar;
                originalString.erase(j, 1);
                break;
            }
        }
    }
    for (int i = 0; i < largerOne.size(); i++)
    {
        char currentChar = largerOne.at(i);
        for (int j = 0; j < originalString.size(); j++)
        {
            if (currentChar == originalString.at(j)) {
                newString += currentChar;
                originalString.erase(j, 1);
                break;
            }
        }
    }
    
    cout << newString + originalString << endl;



    return 0;
}