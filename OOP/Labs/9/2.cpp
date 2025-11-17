#include "grap.h"
#include <iostream>
using namespace std;

//==================== Point ====================
class Point
{
  int x{}, y{};

public:
  Point(int a = 0, int b = 0) : x(a), y(b) {}
  int getX() { return x; }
  int getY() { return y; }
};

//==================== Circle ====================
class Circle
{
  Point center;
  int radius;

public:
  Circle(int x = 0, int y = 0, int r = 0) : center(x, y), radius(r) {}

  // Copy Constructor
  Circle(const Circle &c) : center(c.center), radius(c.radius) {}

  Circle operator+(Circle &other)
  {
    int nx = (center.getX() + other.center.getX());
    int ny = (center.getY() + other.center.getY());
    int nr = radius + other.radius;
    return Circle(nx, ny, nr);
  }

  Point getP() { return center; }
  int getr() { return radius; }
  void draw()
  {
    drawCircle(center.getX(), center.getY(), radius);
  }
};

//==================== Rectangle ====================
class Rect
{
  Point ul, lr;

public:
  Rect(int x1 = 0, int y1 = 0, int x2 = 0, int y2 = 0) : ul(x1, y1), lr(x2, y2) {}

  void draw()
  {
    drawRect(ul.getX(), ul.getY(), lr.getX(), lr.getY());
  }
};

//==================== Line ====================
class Line
{
  Point st, ed;

public:
  Line(int sx = 0, int sy = 0, int ex = 0, int ey = 0) : st(sx, sy), ed(ex, ey) {}

  void draw()
  {
    drawLine(st.getX(), st.getY(), ed.getX(), ed.getY());
  }
};

//==================== Triangle ====================
class Triangle
{
  Point a, b, c;

public:
  Triangle(int x1 = 0, int y1 = 0, int x2 = 0, int y2 = 0, int x3 = 0, int y3 = 0)
      : a(x1, y1), b(x2, y2), c(x3, y3)
  {
  }

  void draw()
  {
    drawTriangle(a.getX(), a.getY(), b.getX(), b.getY(), c.getX(), c.getY());
  }
};

//==================== Ellipse ====================

class Ellipse
{
  Point f1, f2;
  int radius; // semi-major axis (a)
public:
  Ellipse(int x1 = 0, int y1 = 0, int x2 = 0, int y2 = 0, int r = 0)
      : f1(x1, y1), f2(x2, y2), radius(r)
  {
  }

  void draw()
  {
    // midpoint = center
    int cx = (f1.getX() + f2.getX()) / 2;
    int cy = (f1.getY() + f2.getY()) / 2;

    double dx = f1.getX() - f2.getX();
    double dy = f1.getY() - f2.getY();
    double c = sqrt(dx * dx + dy * dy) / 2.0;

    double a = radius;
    if (a <= c)
      return; // invalid ellipse

    double b = sqrt(a * a - c * c);

    drawEllipse(cx, cy, (int)a, (int)b);
  }
};

//==================== Picture ====================
class Picture
{
  Circle **circles;
  int cNum{};
  Rect **rects;
  int rNum{};
  Line **lines;
  int lNum{};
  Triangle **tris;
  int tNum{};
  Ellipse **ellipses;
  int eNum{};

public:
  Picture() : circles(nullptr), rects(nullptr), lines(nullptr),
              tris(nullptr), ellipses(nullptr)
  {
  }

  void setCircles(int n, Circle **arr)
  {
    cNum = n;
    circles = arr;
  }
  void setRects(int n, Rect **arr)
  {
    rNum = n;
    rects = arr;
  }
  void setLines(int n, Line **arr)
  {
    lNum = n;
    lines = arr;
  }
  void setTris(int n, Triangle **arr)
  {
    tNum = n;
    tris = arr;
  }
  void setEllipses(int n, Ellipse **arr)
  {
    eNum = n;
    ellipses = arr;
  }

  void paint()
  {
    for (int i = 0; i < cNum; i++)
      circles[i]->draw();
    for (int i = 0; i < rNum; i++)
      rects[i]->draw();
    for (int i = 0; i < lNum; i++)
      lines[i]->draw();
    for (int i = 0; i < tNum; i++)
      tris[i]->draw();
    for (int i = 0; i < eNum; i++)
      ellipses[i]->draw();
  }
};

//==================== MAIN ====================
int main()
{
  initScreen();

  Picture pic;

  //=============== Dynamic Circle Input ===============
  Circle c1(12, 32, 123);
  Circle c3 = c1 + c1;
  cout << "c1 = " << c1.getP().getX() << endl
       << c1.getP().getY() << endl
       << c1.getr();
  cout << "c3 = " << c3.getP().getX() << endl
       << c3.getP().getY() << endl
       << c3.getr();
  /*int cn;
  cout << "How many circles? ";
  cin >> cn;

  Circle** carr = new Circle * [cn];
  for (int i = 0; i < cn; i++) {
      int x, y, r;
      cout << "Circle #" << i + 1 << " (x y r): ";
      cin >> x >> y >> r;
      carr[i] = new Circle(x, y, r);
  }
  pic.setCircles(cn, carr);*/

  //=============== Dynamic Ellipse Input ===============
  int en;
  cout << "How many ellipses? ";
  cin >> en;

  Ellipse **earr = new Ellipse *[en];
  for (int i = 0; i < en; i++)
  {
    int x1, y1, x2, y2, r;
    cout << "Ellipse #" << i + 1 << " (x1, y1, x2, y2, r): ";
    cin >> x1 >> y1 >> x2 >> y2 >> r;
    earr[i] = new Ellipse(x1, y1, x2, y2, r);
  }
  pic.setEllipses(en, earr);

  // Static rectangles
  Rect *rects[2] = {
      new Rect(5, 5, 20, 10),
      new Rect(25, 5, 40, 15),
  };
  pic.setRects(2, rects);

  // Draw all shapes
  pic.paint();

  renderScreen();
  return 0;
}
