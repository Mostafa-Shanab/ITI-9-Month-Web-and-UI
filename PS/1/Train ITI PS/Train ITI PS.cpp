#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n, m;
    cin >> n >> m;
    int *all_points = new int[m + 1]{0};

    for (int i = 0; i < n; i++)
    {
        int left, right;
        cin >> left >> right;
        for (int j = left; j <= right; j++)
        {
            all_points[j]++;
        }
    }
    // cout << "asd Shanab\n";
    // for (int i = 0; i < m + 1; i++)
    // {
    //     cout << all_points[i] << " ";
    // }

    vector<int> not_in_segment;
    int cnt = 0;
    for (int i = 1; i < m + 1; i++)
    {
        if (all_points[i] == 0)
        {
            cnt++;
            not_in_segment.push_back(i);
        }
    }
    if (cnt > 0)
    {
        cout << cnt << endl;
        for (int i = 0; i < not_in_segment.size(); i++)
        {
            cout << not_in_segment[i] << " ";
        }
    }
    else
    {
        cout << 0;
    }

    return 0;
}
