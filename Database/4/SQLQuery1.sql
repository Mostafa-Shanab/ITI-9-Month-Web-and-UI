use Company_SD

--1
select Dependent_name, d.Sex
from Dependent d inner join Employee e on d.ESSN = e.SSN
where d.Sex = 'F' and e.Sex = 'F'
union all
select d.Dependent_name, d.Sex
from Dependent d inner join Employee e on d.ESSN = e.SSN
where d.Sex = 'M' and e.Sex = 'M'



--2
select p.Pname, sum(w.hours) "Total Hours"
from Project p 
	inner join Works_for w
	on w.Pno = p.Pnumber
group by w.Pno, p.Pname

--3
select d.*
from Departments d --inner join Employee e
--on d.Dnum = e.Dno and e.SSN = (select min(SSN) from Employee)
where d.Dnum = (select Dno from Employee where SSN = (select min(SSN) from Employee))
-- try joins!

--4
select d.dname,max(e.Salary) maxSalary, min(e.Salary) minSalary, avg(e.Salary) avgSalary
from Employee e inner join Departments d on e.Dno = d.dnum
group by e.Dno, d.dname

--5
select m.fname + ' ' + m.lname "Full Name"
from Employee m inner join Departments d
on m.SSN = d.MGRSSN inner join Dependent de
on m.SSN = de.ESSN and d.MGRSSN != de.ESSN
-- ask ?

--5
--select distinct m.fname + ' ' + m.lname "Full Name"
select m.fname + ' ' + m.lname "Full Name"
from Employee m inner join Departments d
on m.SSN = d.MGRSSN and
m.SSN not in (select distinct de.ESSN from Dependent de)

--6
select e.Dno, count(e.Dno)
from Employee e
group by e.Dno
having avg(Salary) < (select avg(Salary) from Employee)

--7
select e.fname + ' ' + e.lname "Full Name", p.Pname
from Employee e inner join Works_for w
on w.ESSn = e.SSN inner join Project p
on w.Pno = p.Pnumber
order by e.Dno, e.Lname, e.Fname

select salary from Employee
--8
select salary from Employee
where Salary >= (select max(salary) from Employee
where Salary < (select max(salary) from Employee))

--9
select e.fname + ' ' + e.lname "Full Name"
from Employee e inner join Dependent de
on e.SSN = de.ESSN and e.Fname + ' ' + e.Lname = de.Dependent_name

--10
select e.SSN, e.Fname + ' ' + e.Lname "Full Name"
from Employee e
where exists (select 1 from Dependent d 
where d.ESSN = e.SSN)


--11
insert into Departments 
	values('DEPT IT', 100, 112233,'1-11-2006')
select * from Departments

--12 a
update Departments
set MGRSSN = 968574
where Dnum = 100
select * from Departments

--12 b
update Departments
set MGRSSN = 102672
where Dnum = 20
select * from Departments

--12 c
update employee
set Superssn = 102672
where SSN = 102660
select * from employee

--13
delete Dependent
where ESSN = 223344

update Departments
set MGRSSN = 102672
where MGRSSN = 223344

update Employee
set Superssn = 102672
where Superssn = 223344

update Works_for
set ESSn = 102672
where ESSn = 223344

delete from Employee
where SSN = 223344


--14
update Employee
set Salary += Salary*0.3
from Employee e inner join Works_for w
on e.SSN = w.ESSn inner join Project p
on w.Pno = p.Pnumber and p.Pname = 'Al Rabwah'


