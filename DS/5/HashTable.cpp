#include <iostream>
#include <vector>
#include <list>
#include <functional>
#include <algorithm>
#include <stdexcept>

using namespace std;

template <class KeyType, class ValueType>
class MapEntry
{
  KeyType key;
  ValueType value;

public:
  MapEntry(const KeyType &k, const ValueType &v)
      : key(k), value(v) {}

  KeyType GetKey() const { return key; }
  ValueType GetValue() const { return value; }
  void SetValue(const ValueType &v) { value = v; }

  bool operator==(const KeyType &k) const
  {
    return key == k;
  }
};

template <class KeyType, class ValueType>
class HashTable
{
  vector<list<MapEntry<KeyType, ValueType>>> theLists;
  int currentSize;

  static constexpr double MAX_LOAD_FACTOR = 0.7;

public:
  explicit HashTable(int size = 101)
      : theLists(size), currentSize(0) {}

  bool Contains(const KeyType &x) const
  {
    int index = MyHashFunction(x);
    const auto &bucket = theLists[index];

    for (const auto &entry : bucket)
      if (entry.GetKey() == x)
        return true;

    return false;
  }

  bool Insert(const KeyType &x, const ValueType &y)
  {
    int index = MyHashFunction(x);
    auto &bucket = theLists[index];

    for (auto &entry : bucket)
    {
      if (entry.GetKey() == x)
        return false; // Duplicate key
    }

    bucket.emplace_back(x, y);
    currentSize++;

    if (LoadFactor() > MAX_LOAD_FACTOR)
      Rehash();

    return true;
  }

  bool Remove(const KeyType &x)
  {
    int index = MyHashFunction(x);
    auto &bucket = theLists[index];

    auto itr = find(bucket.begin(), bucket.end(), x);
    if (itr == bucket.end())
      return false;

    bucket.erase(itr);
    currentSize--;
    return true;
  }

  ValueType LookUP(const KeyType &key) const
  {
    int index = MyHashFunction(key);
    const auto &bucket = theLists[index];

    for (const auto &entry : bucket)
      if (entry.GetKey() == key)
        return entry.GetValue();

    throw runtime_error("Key not found");
  }

  void MakeEmpty()
  {
    for (auto &lst : theLists)
      lst.clear();
    currentSize = 0;
  }

private:
  double LoadFactor() const
  {
    return static_cast<double>(currentSize) / theLists.size();
  }

  void Rehash()
  {
    vector<list<MapEntry<KeyType, ValueType>>> oldLists = theLists;

    theLists.clear();
    theLists.resize(oldLists.size() * 2);
    currentSize = 0;

    for (const auto &bucket : oldLists)
    {
      for (const auto &entry : bucket)
        Insert(entry.GetKey(), entry.GetValue());
    }
  }

protected:
  int MyHashFunction(const KeyType &x) const
  {
    hash<KeyType> hashFunc;
    return hashFunc(x) % theLists.size();
  }
};

int main()
{
  HashTable<int, string> table;

  table.Insert(1, "Ali");
  table.Insert(2, "Ahmed");
  table.Insert(3, "Omar");

  cout << table.LookUP(2) << endl;

  table.Remove(2);

  cout << (table.Contains(2) ? "Found" : "Not Found") << endl;

  return 0;
}
