#include <iostream>
#include <vector>
#include <list>
#include <queue>
#include <stack>
#include <climits>
#include <algorithm>

using namespace std;

template <class VertexType>
class Graph
{
  int numVertices;
  vector<VertexType> vertices;
  vector<list<pair<int, int>>> adjList; // (neighborIndex , weight)
  vector<bool> visited;

public:
  Graph()
  {
    numVertices = 0;
  }

  void AddVertex(const VertexType &v)
  {
    vertices.push_back(v);
    adjList.push_back(list<pair<int, int>>());
    visited.push_back(false);
    numVertices++;
  }

  void AddEdge(const VertexType &from, const VertexType &to, int weight)
  {
    int u = GetIndex(from);
    int v = GetIndex(to);

    adjList[u].push_back({v, weight});
    adjList[v].push_back({u, weight}); // Undirected
  }

  int GetIndex(const VertexType &v)
  {
    for (int i = 0; i < numVertices; i++)
      if (vertices[i] == v)
        return i;
    throw runtime_error("Vertex not found");
  }

  void ClearVisited()
  {
    fill(visited.begin(), visited.end(), false);
  }

  /// ================= DFS + PATH =================
  bool DFS_Path(const VertexType &start, const VertexType &end)
  {
    vector<int> parent(numVertices, -1);
    ClearVisited();

    stack<int> st;
    int s = GetIndex(start);
    int e = GetIndex(end);

    st.push(s);

    while (!st.empty())
    {
      int u = st.top();
      st.pop();

      if (visited[u])
        continue;
      visited[u] = true;

      if (u == e)
      {
        PrintPath(parent, s, e);
        return true;
      }

      for (auto neighbor : adjList[u])
      {
        int v = neighbor.first;
        if (!visited[v])
        {
          parent[v] = u;
          st.push(v);
        }
      }
    }
    return false;
  }

  /// ================= BFS + SHORTEST PATH =================
  bool BFS_Path(const VertexType &start, const VertexType &end)
  {
    vector<int> parent(numVertices, -1);
    ClearVisited();

    queue<int> q;
    int s = GetIndex(start);
    int e = GetIndex(end);

    q.push(s);
    visited[s] = true;

    while (!q.empty())
    {
      int u = q.front();
      q.pop();

      if (u == e)
      {
        PrintPath(parent, s, e);
        return true;
      }

      for (auto neighbor : adjList[u])
      {
        int v = neighbor.first;
        if (!visited[v])
        {
          visited[v] = true;
          parent[v] = u;
          q.push(v);
        }
      }
    }
    return false;
  }

  /// ================= DIJKSTRA + PATH =================
  void Dijkstra(const VertexType &start)
  {
    int s = GetIndex(start);

    vector<int> dist(numVertices, INT_MAX);
    vector<int> parent(numVertices, -1);
    vector<bool> used(numVertices, false);

    dist[s] = 0;

    for (int i = 0; i < numVertices; i++)
    {
      int u = MinDistance(dist, used);
      used[u] = true;

      for (auto neighbor : adjList[u])
      {
        int v = neighbor.first;
        int w = neighbor.second;

        if (!used[v] && dist[u] + w < dist[v])
        {
          dist[v] = dist[u] + w;
          parent[v] = u;
        }
      }
    }

    cout << "\nDijkstra Shortest Paths from " << start << ":\n";
    for (int i = 0; i < numVertices; i++)
    {
      cout << start << " -> " << vertices[i] << " = " << dist[i] << " | Path: ";
      PrintPath(parent, s, i);
    }
  }

private:
  int MinDistance(const vector<int> &dist, const vector<bool> &used)
  {
    int min = INT_MAX, idx = -1;
    for (int i = 0; i < numVertices; i++)
      if (!used[i] && dist[i] <= min)
      {
        min = dist[i];
        idx = i;
      }
    return idx;
  }

  void PrintPath(const vector<int> &parent, int start, int end)
  {
    if (end == -1)
      return;

    vector<int> path;
    for (int v = end; v != -1; v = parent[v])
      path.push_back(v);

    reverse(path.begin(), path.end());

    for (int idx : path)
      cout << vertices[idx] << " ";
    cout << endl;
  }
};

int main()
{
  Graph<char> g;

  g.AddVertex('A');
  g.AddVertex('B');
  g.AddVertex('C');
  g.AddVertex('D');
  g.AddVertex('E');

  g.AddEdge('A', 'B', 1);
  g.AddEdge('A', 'E', 3);
  g.AddEdge('A', 'C', 4);
  g.AddEdge('B', 'C', 2);
  g.AddEdge('B', 'D', 5);
  g.AddEdge('C', 'D', 1);
  g.AddEdge('D', 'E', 3);

  cout << "DFS Path A -> E:\n";
  g.DFS_Path('A', 'E');

  cout << "\nBFS Shortest Path A -> E:\n";
  g.BFS_Path('A', 'E');

  g.Dijkstra('A');

  return 0;
}
