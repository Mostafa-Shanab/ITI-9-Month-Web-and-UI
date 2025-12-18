#include <iostream>
#include<vector>>
#include<list> /// STL : Double Linked List
#include<functional>
#include<algorithm>
#include<queue>>

using namespace std;

template<class KeyType , class ValueType>
class MapEntry
{
    KeyType Key ;  /// int
    ValueType Value ; ///Employee

public :

    MapEntry(KeyType _Key , ValueType _Value) {Key = _Key; Value = _Value;}

    KeyType GetKey () { return Key;}
    ValueType GetValue() { return Value;}
};

template<class KeyType , class ValueType>
class HashTable
{
    vector<list<MapEntry<KeyType,ValueType>>> theLists;
    int currentSize ;

public:
    explicit HashTable (int Size = 101) : theLists(Size)  {currentSize = 0;}

    bool Contains (const KeyType & x) const
    {
        int WhichList = MyHashFunction(x);

        ///O(1) Const Time
        list<MapEntry<KeyType,ValueType>> Bucket = theLists[WhichList]; /// Double Linked List , List x May be in it

        ///Manually Loop through each double Linked List Nodes , till x is found - O(N)
        typename list<MapEntry<KeyType,ValueType>>::iterator itr = Bucket.begin();
        //auto  itr = Bucket.begin();

        while(itr != Bucket.end())
        {
            if (*itr == x)
                return true;
            ///Advance Pointer
            itr++; ///pCurrent = pCurrent ->pNext;
        }
        return false;
    }

    bool Insert (const KeyType& X , const ValueType& Y)
    {
        if (Contains(X)) return false;

        int WhichList = MyHashFunction(X);

        theLists[WhichList].push_back(X);

        currentSize++;

        ///Check Load Factor : currentSize / theLists.size , > 0.7 rehashing (increase Vector Size By 2 , rehash All existing object )
        return true;
    }

    bool Remove(const KeyType& X)
    {
        int WhichList = MyHashFunction(X);

        auto itr = std::find(theLists[WhichList].begin() , theLists[WhichList].end(),X);

        if (itr == theLists[WhichList].end())  return false;

        theLists[WhichList].erase(itr); /// RemoteAt(Node*)
        currentSize--;
        return true;
    }

    void MakeEmpty ()
    {
        for (list<MapEntry<KeyType,ValueType>> lst : theLists)  lst.clear();
        currentSize = 0;
    }

    void Rehash ()
    {
        /// Size *2 , Rehash Existing Objects
    }


    ValueType LookUP (const KeyType& Key) const
    {
        /*Basic Function of Hash Table*/

        ///1. Compute Hash Value for Key : Index
        ///2. Access Bucket
        ///3. Search Linearly for Key
        ///4. if Found return Value
    }


protected:
    int MyHashFunction (const KeyType& x)const
    {
        std::hash<KeyType> hashFunction ;

        int InitialHashValue = hashFunction(x);

        return  InitialHashValue %  theLists.size();
    }
};



template<class VertexType>
class Graph
{
    int numVertices ;               ///Current Number of Vertices
    VertexType vertices[50] ;  ///Max Number of Vertices is 50
    int edegs[50][50] ;              ///Adjacency Matrix
    bool marks[50];

public:
    explicit Graph() {numVertices = 0;}

    void MakeEmpty();
    bool IsEmpty();
    bool IsFull();

    void AddVertex (const VertexType& vertex);
    void AddEdge(VertexType fromVertex ,VertexType toVertex , int Weight );
    int GetPathWeight (VertexType fromVertex ,VertexType toVertex);
    int GetIndex (const VertexType& vertex);
    void GetAdjVertices (VertexType vertex , queue<VertexType> & VertexQ);

    void ClearMarks ();
    void MarkVertex(VertexType vertex);
    bool IsMarked (VertexType vertex);

    ///Standard Algorithms ( only one from 1 , 2 ) and Implement 3
    ////1.
    void DepthFirstSearch (const VertexType& startVertex , const VertexType& endVertex);  /// Stack , Queue
    ///2.
    void BreadthFirstSearch (const VertexType& startVertex , const VertexType& endVertex); /// 2 Queue
    ///3. Print All Shortest Path /// Dijkstra
    void Dijkstra (const VertexType& startVertex); /// Pirority Queue , Adjacent Queue

};


int main()
{
//    HashTable MyTable ;

  //  MyTable.Insert ();


    cout << "Hello world!" << endl;
    return 0;
}
