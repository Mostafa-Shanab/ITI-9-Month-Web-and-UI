#include <iostream>
#include <string>
using namespace std;

class BankAccount
{
private:
  string accountHolder;
  int accountNumber;
  double balance;

  static int counter;
  static int nextID;

public:


  BankAccount()
  {
    accountHolder = "Unknown";
    balance = 0.0;
    accountNumber = ++nextID;
    counter++;
    cout << "Default constructor called for Account #" << accountNumber << endl;
  }

  BankAccount(string name, double initialBalance)
  {
    accountHolder = name;
    balance = initialBalance;
    accountNumber = ++nextID;
    counter++;
    cout << "Parameterized constructor called for Account #" << accountNumber << endl;
  }

  ~BankAccount()
  {
    cout << "Destructor called for Account #" << accountNumber << endl;
  }

  BankAccount &deposit(double amount)
  {
    if (amount <= 0)
    {
      cout << "Invalid deposit amount.\n";
      return *this;
    }
    balance += amount;
    cout << "Deposited " << amount << " to Account #" << accountNumber << endl;
    return *this; // enables method chaining
  }

  BankAccount &withdraw(double amount)
  {
    if (amount <= 0)
    {
      cout << "Invalid withdrawal amount.\n";
      return *this;
    }
    if (amount > balance)
    {
      cout << "Insufficient balance in Account #" << accountNumber << endl;
      return *this;
    }
    balance -= amount;
    cout << "Withdrew " << amount << " from Account #" << accountNumber << endl;
    return *this;
  }

  void showAccount() const
  {
    cout << "\n--- Account Details ---\n";
    cout << "Holder Name: " << accountHolder << endl;
    cout << "Account Number: " << accountNumber << endl;
    cout << "Balance: " << balance << endl;
  }

  double getBalance() const
  {
    return balance;
  }

  static void showCounter()
  {
    cout << "\nTotal Accounts Created: " << counter << endl;
  }
};

int BankAccount::counter = 0;
int BankAccount::nextID = 1000; // starting account numbers from 1001

int main()
{
  BankAccount acc1;
  BankAccount acc2("Shanab", 5000);

  acc2.deposit(2000).deposit(1500).withdraw(1000);
  acc2.showAccount();

  acc1.deposit(300).withdraw(100);
  acc1.showAccount();

  BankAccount::showCounter();

  return 0;
}
