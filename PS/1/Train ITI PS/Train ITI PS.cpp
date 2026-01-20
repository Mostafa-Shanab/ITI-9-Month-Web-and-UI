#include <iostream>
#include <math.h>

using namespace std;

int main()
{
    int n, m;
    cin >> n >> m;
    int res = 0;

    for (int a = 0; a <= sqrt(max(n, m)); a++)
    {
        int b = n - a * a;
        if (b * b + a == m)
        {
            cout << "a: " << a << " b: " << b << endl;
            res++;
        }
    }

    cout << res << endl;

    return 0;
}