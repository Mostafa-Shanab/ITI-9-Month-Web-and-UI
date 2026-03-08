#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n, k, current_sum = 0;
    cin >> n >> k;

    vector<int> h(n);
    for (int i = 0; i < n; i++)
    {
        cin >> h[i];
        if (i < k)
            current_sum += h[i];
    }

    int min_sum = current_sum;
    int min_index = 0;

    for (int i = k; i < n; i++)
    {
        current_sum += h[i];
        current_sum -= h[i - k];

        if (current_sum < min_sum)
        {
            min_sum = current_sum;
            min_index = i - k + 1;
        }
    }

    cout << min_index + 1 << endl;

    return 0;
}