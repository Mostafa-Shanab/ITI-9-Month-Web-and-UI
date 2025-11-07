#include <iostream>
#include <array>

using namespace std;

const int NUM_STUDENTS = 3;
const int NUM_SUBJECTS = 3;

struct Subject
{
  int id;
  string title;
  float grade;
};

struct Student
{
  int id;
  string name;
  array<Subject, NUM_SUBJECTS> subjects;
};

int main()
{
  // int x;
  // cin >> x;
  // int asdh[x];
  // array<Student, x> students;
  array<Student, NUM_STUDENTS> students;

  // Input students and their subjects
  for (int i = 0; i < NUM_STUDENTS; i++)
  {
    cout << "\n--- Enter info for Student " << i + 1 << " ---\n";
    cout << "ID: ";
    cin >> students[i].id;
    cout << "Name: ";
    cin >> students[i].name;

    for (int j = 0; j < NUM_SUBJECTS; j++)
    {
      cout << "  Subject " << j + 1 << " ID: ";
      cin >> students[i].subjects[j].id;
      cout << "  Subject " << j + 1 << " Title: ";
      cin >> students[i].subjects[j].title;
      cout << "  Subject " << j + 1 << " Grade: ";
      cin >> students[i].subjects[j].grade;
    }
  }

  // ----- Calculate and Display Each Student’s Total -----
  cout << "\n===== Students Summary =====\n";
  for (int i = 0; i < NUM_STUDENTS; i++)
  {
    cout << "\nStudent " << students[i].id << " - " << students[i].name << "\n";
    double total = 0;

    for (int j = 0; j < NUM_SUBJECTS; j++)
    {
      cout << "  [" << students[i].subjects[j].id << "] "
           << students[i].subjects[j].title
           << " -> Grade: " << students[i].subjects[j].grade << "\n";
      total += students[i].subjects[j].grade;
    }

    cout << "Total Grades (Sum): " << total << "\n";
  }

  // ----- Calculate Each Subject’s Average -----
  cout << "\n===== Subjects Average Across Students =====\n";

  for (int j = 0; j < NUM_SUBJECTS; j++)
  {
    double sumGrades = 0;

    // We assume each student has the same subjects order
    string title = students[0].subjects[j].title;
    int id = students[0].subjects[j].id;

    for (int i = 0; i < NUM_STUDENTS; i++)
    {
      sumGrades += students[i].subjects[j].grade;
    }

    double avg = sumGrades / NUM_STUDENTS;
    cout << "[" << id << "] " << title << " -> Average Grade: " << avg << "\n";
  }

  return 0;
}
