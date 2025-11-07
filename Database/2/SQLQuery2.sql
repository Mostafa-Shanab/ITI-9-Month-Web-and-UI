use Company_SD

--1
select*from Employee

--2
select fname, lname, Salary, dno from Employee

--3
select pname, plocation, dnum from project

--4
select fname + ' ' + lname "Full Name", salary*12*0.1 "ANNUAL COMM" from Employee

--5
select SSN, fname + ' ' + lname "Name" from Employee where salary > 1000

--6
select SSN, fname + ' ' + lname "Name" from Employee where salary*12 > 10000

--7
select fname + ' ' + lname "Name", salary from Employee where sex = 'F'

--8
select dnum, dname from departments where MGRSSN = 968574

--9
select pnumber, pname, plocation from project where dnum = 10

