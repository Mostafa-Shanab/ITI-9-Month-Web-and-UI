#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <iomanip> // Added for better output formatting

using namespace std;

class GeoShape
{
public:
  virtual double area() = 0;
  virtual double perimeter() = 0;
  virtual double volume() { return 0.0; }

  virtual void print()

  {
    cout << "GeoShape (abstract)";
  }

  double operator+(GeoShape &other)

  {
    return this->area() + other.area();
  }
  bool operator<(GeoShape &other)

  {
    return this->area() < other.area();
  }
  bool operator>(GeoShape &other)

  {
    return this->area() > other.area();
  }
  bool operator==(GeoShape &other)

  {
    return abs(this->area() - other.area()) < 1e-9;
  }

  static int compareByArea(GeoShape &a, GeoShape &b)

  {
    if (a < b)
      return -1;
    if (b < a)
      return 1;
    return 0;
  }
};

void operator<<(ostream &os, GeoShape &s)
{
  s.print();
}

// ------------------- 2D: Circle (Public Inheritance) -------------------
class Circle : public GeoShape
{
private:
  double r;

public:
  Circle(double radius) : r(radius) {}
  double area() override { return M_PI * r * r; }
  double perimeter() override { return 2.0 * M_PI * r; }
  double getRadius() { return r; }

  void print() override

  {
    cout << "Circle(radius=" << r << ", area=" << area() << ", perimeter=" << perimeter() << ")";
  }
};
class Square : public GeoShape
{
private:
  double side;

public:
  Square(double s) : side(s) {}
  double area() override { return side * side; }
  double perimeter() override { return 4 * side; }
  double getSide() { return side; }

  void print() override

  {
    cout << "Square(Side=" << side << ", area=" << area() << ", perimeter=" << perimeter() << ")";
  }
};

// ------------------- 2D: Triangle (Protected Inheritance) -------------------
class Triangle : public GeoShape // <-- Protected Inheritance
{
private:
  double a, b, c;

public:
  Triangle(double sideA, double sideB, double sideC) : a(sideA), b(sideB), c(sideC) {}

  double perimeter() override { return a + b + c; }
  double area() override

  {
    return 0.5 * a * b;
  }

  void print() override

  {
    cout << "Triangle(sides=" << a << "," << b << "," << c << ", area=" << area() << ")";
  }
};

class Rhombus : private GeoShape // <-- Private Inheritance
{
private:
  double d1, d2;

public:
  Rhombus(double diag1, double diag2) : d1(diag1), d2(diag2) {}
  double area() override { return (d1 * d2) / 2.0; }
  double perimeter() override

  {
    double half1 = d1 / 2.0, half2 = d2 / 2.0;
    double side = sqrt(half1 * half1 + half2 * half2);
    return 4.0 * side;
  }
  void print() override

  {
    cout << "Rhombus(d1=" << d1 << ", d2=" << d2 << ", area=" << area() << ")";
  }
};

// ------------------- 3D: Cube (Public Inheritance) -------------------
class Cube : public Square
{

public:
  Cube(double s) : Square(s) {}
  double area() override { return 6.0 * getSide() * getSide(); }
  double perimeter() override { return 12.0 * getSide(); }
  double volume() override { return getSide() * getSide() * getSide(); }

  void print() override

  {
    cout << "Cube(side=" << getSide() << ", surfaceArea=" << area() << ", volume=" << volume() << ")";
  }
};

// ------------------- Stand-alone function to compare two shapes by area -------------------
int compareShapesByArea(GeoShape &a, GeoShape &b)
{
  if (a < b)
    return -1;
  if (b < a)
    return 1;
  return 0;
}

// ------------------- Example main demonstrating dynamic allocation and sorting -------------------
int main()
{
  cout << fixed << setprecision(4);

  vector<GeoShape *> shapes;
  shapes.push_back(new Circle(2.5));
  shapes.push_back(new Triangle(3.4, 4.0, 5.0));
  shapes.push_back((GeoShape *)new Rhombus(5.0, 6.0));
  shapes.push_back(new Cube(2.0));

  cout << "All shapes (unsorted):\n";
  for (auto *s : shapes)

  {
    cout << endl;
    cout << *s;
    cout << endl;
  }

  cout << "\nCompare area of first two shapes: ";
  int cmp = compareShapesByArea(*shapes[0], *shapes[1]);
  if (*shapes[0] < *shapes[1])
    cout << "shape0 < shape1\n";
  else if (*shapes[0] > *shapes[1])
    cout << "shape0 > shape1\n";
  else if (*shapes[0] == *shapes[1])
    cout << "shape0 == shape1\n";

  sort(shapes.begin(), shapes.end(), [](GeoShape *a, GeoShape *b)
       { return *a < *b; });

  cout << "\nShapes sorted by area (ascending):\n";
  for (auto *s : shapes)

  {
    cout << *s;
    cout << " (area=" << s->area() << ")\n";
  }

  sort(shapes.begin(), shapes.end(), [](GeoShape *a, GeoShape *b)
       { return *b < *a; });
  cout << "\nShapes sorted by area (descending):\n";
  for (auto *s : shapes)

  {
    cout << *s;
    cout << " (area=" << s->area() << ")\n";
  }

  cout << "\nOperator+ (area sum) circle + triangle = " << (*shapes[0] + *shapes[1]) << "\n";
  cout << "Are first two shapes equal area? " << ((*shapes[0] == *shapes[1]) ? "yes" : "no") << "\n";

  return 0;
}