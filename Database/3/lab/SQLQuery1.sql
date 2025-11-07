use Company_SD

--1
select dnum, dname, mgrssn, fname + ' ' + lname "Full Name"
from Departments d, employee e
where d.MGRSSN = e.ssn

--1
select dnum, dname, mgrssn, fname + ' ' + lname "Full Name"
from Departments d inner join employee e
on d.MGRSSN = e.ssn

--2
select dname, pname
from Departments d inner join project p
on d.dnum = p.dnum

--3
select fname, d.*
from Employee e inner join Dependent d
on d.ESSN = e.SSN

--4
select Pnumber, pname, plocation
from project
where city = 'cairo'or city = 'alex'

--5
select *
from project
where pname like 'a%'

--6
select *
from Employee
where dno = 30 and salary >= 1000 and salary <= 1500

--7
select e.*
from 
	Employee e 
	inner join Works_for w
	on w.ESSn = e.SSN 
	inner join Project p
	on w.Pno = p.Pnumber and e.Dno = 10 and p.Pname = 'AL Rabwah'


--8
select e.fname + ' '+ e.lname "Employee Name"
from Employee E inner join Employee M
on E.Superssn = M.SSN and M.Fname = 'Kamel' and M.Lname = 'Mohamed'


--9
select e.fname + ' '+ e.lname "Employee Name", p.pname
from Employee e 
	inner join Works_for w
	on w.ESSn = e.SSN 
	inner join Project p
	on w.Pno = p.Pnumber
	order by p.pname


--10
select p.Pnumber, d.Dname, e.Lname, e.Address, e.Bdate
from Project p 
	inner join Departments d
	on p.Dnum = d.Dnum
	inner join Employee e
	on d.MGRSSN = e.SSN and p.City = 'Cairo'


--11
select m.*
from Departments d
	inner join Employee m
	on d.MGRSSN = m.SSN


--12
select e.*, d.*
from Employee e left outer join Dependent d
on d.ESSN = e.SSN

--13
insert into Employee(Fname, Lname, Dno,SSN, Superssn, Salary) 
			values('Mostafa','Shanab', 30, 102672, 112233, 3000)

select * from Employee

--14
insert into Employee(Fname, Lname, Dno,SSN) 
			values('Ahmed','Esmat', 30, 102660)

select * from Employee

--15
update Employee 
	set Salary += Salary*0.2
	where SSN = 102672

