#include <iostream>
#include <vector>
using namespace std;

class Author
{
  string name;
  string nationality;

public:
  Author(string n, string nat) : name(n), nationality(nat)
  {
  }

  string getName() { return name; }
  string getNationality() { return nationality; }
};

// composition between Book and Author
class Book
{
  string title;
  int publish_year;
  // Author author;
  Author *author;

public:
  Book(string t, int y, string an, string anat) : title(t), publish_year(y) //, author(an, anat)
  {
    author = new Author(an, anat);
  }

  // Copy Constructor (Deep copy)
  Book(const Book &other)
  {
    title = other.title;
    publish_year = other.publish_year;
    author = new Author(*other.author);
  }

  // Assignment Operator (Deep copy)
  Book &operator=(const Book &other)
  {
    if (this != &other)
    {
      title = other.title;
      publish_year = other.publish_year;
      delete author;
      author = new Author(*other.author);
    }
    return *this;
  }

  string getTitle() { return title; }
  int getPubYear() { return publish_year; }
  string getAuthorName()
  {
    return author->getName();
    // return author.getName();
  }

  string getAuthorNationality()
  {
    // return author.getNationality();
    return author->getNationality();
  }
  ~Book()
  {
    delete author;
  } // must delete author when deleting book
};
// Aggregation Book & Library
class Library
{
  // vector of pointers,Array of pointers dynamic ,pointer to pointers
  vector<Book> books;

public:
  // void addBooks(Book *b)
  // {
  //   books.push_back(b);
  // }
  void addBooks(Book b)
  {
    books.push_back(b);
  }
  void listBooks()
  {
    cout << "Library books" << endl;
    for (auto bb : books)
      cout << bb.getTitle() << ", authored by: " << bb.getAuthorName() << ", in: " << bb.getPubYear() << endl;
    // cout << bb->getTitle() << "authored by: " << bb->getAuthorName() << "in: " << bb->getPubYear() << endl;
  }
};

// Association Member &book
class Member
{
  string name;
  int id;

public:
  Member() = default;
  Member(string n, int i) : name(n), id(i) {}
  void borrowBook(Book &b)
  {
    cout << "Member: " << name << ", borrowed: " << b.getTitle() << endl;
  }
};

int main()
{
  cout << "Hello Library!" << endl;
  Book b1("1948", 1949, "George", "British");
  Book b2("Farm Animal", 1955, "George", "British");
  Book b3("Tales of 2 Cities", 1940, "Gee", "Bri");
  // library
  Library lib;
  lib.addBooks(b1);
  lib.addBooks(b2);
  lib.addBooks(b3);
  // lib.addBooks(&b1);
  // lib.addBooks(&b2);
  // lib.addBooks(&b3);
  lib.listBooks();
  Member m("Ahmed", 55);
  Member m2("sherry", 66);
  m.borrowBook(b1);
  m2.borrowBook(b2);
  return 0;
}