use ITI

--1
select count(*) from Student
where St_Age is not null

--2
select distinct Ins_Name
from Instructor

--3
select s.St_Id, isnull(s.St_Fname, '') + ' ' + isnull(s.St_Lname,'') "Full Name", isnull(d.Dept_Name, '')
from Student s left outer join Department d
on s.Dept_Id = d.Dept_Id

--4
select i.Ins_Name, d.Dept_Name
from Instructor i left join Department d
on i.Dept_Id = d.Dept_Id

--5
select 
(s.St_Fname) +
' ' + (s.St_Lname)
"Full Name", c.Crs_Name, sc.Grade
from Student s join Stud_Course sc
on s.St_Id = sc.St_Id inner join
Course c on sc.Crs_Id = c.Crs_Id
and sc.Grade is not null

--6
select count(*) numCourses, t.Top_Name
from Course c inner join
Topic t on c.Top_Id = t.Top_Id
group by c.Top_Id, t.Top_Name

--7
select max(isnull(salary,0)) max,
min(isnull(salary,0)) min
from Instructor

--8
select Ins_Name
from Instructor
where Salary < (select avg(Salary) from Instructor)

--9
select d.Dept_Name
from Instructor i inner join
Department d on i.Dept_Id = d.Dept_Id
and i.Salary = (select min(Salary) from Instructor)

--10
select top(2) Salary, Ins_Name
FROM Instructor order by Salary desc

--11
select Ins_Name, coalesce(Salary,'bonuskeyword')
FROM Instructor 

--12
select avg(Salary)
from Instructor

--13
select s.St_Fname, m.*
from Student s inner join
Student m on s.St_super = m.St_Id

--14
SELECT Ins_Name, salary, Dept_Id
FROM (
    SELECT Ins_Name, salary, Dept_Id,
        row_number() OVER (
            PARTITION BY dept_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM Instructor
) as new_table
WHERE salary_rank <= 2 and Salary is not null

    SELECT 
        Ins_Name,
        salary,
        Dept_Id,
        ROW_NUMBER() OVER (
            PARTITION BY dept_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM Instructor
    WHERE salary IS NOT NULL

--15
SELECT st_fname + ' ' + st_lname, Dept_Id
FROM (
    SELECT 
        St_Fname,
        st_lname,
        Dept_Id,
        ROW_NUMBER() OVER (
            PARTITION BY Dept_Id
            ORDER BY NEWID()
        ) AS random_rank
    FROM Student
) as ranked
WHERE random_rank = 1;


use AdventureWorks2012

--1
select SalesOrderID, ShipDate 
from sales.salesorderheader
where OrderDate >= '7/28/2002' and DueDate <= '7/29/2014'

--2
select ProductID, Name
from Production.product
where StandardCost < 110

--3
select ProductID, Name
from Production.product
where Weight is null

--4
select ProductID, Name
from Production.product
where Color in ('Silver', 'Black', 'Red')

--5
select ProductID, Name
from Production.product
where name like 'b%'

--6
UPDATE Production.ProductDescription
SET Description = 'Chromoly steel_High of defects'
WHERE ProductDescriptionID = 3

select ProductDescriptionID, Description
from Production.ProductDescription
WHERE Description like '%\_%' escape '\'

--7
select sum(TotalDue)
from Sales.SalesOrderHeader
where OrderDate between '7/1/2001' and '7/31/2014'

--8
select distinct hiredate
from HumanResources.Employee

--9
SELECT AVG(DISTINCT ListPrice)
FROM Production.Product;

--10
SELECT 'The ', Name, 'is only! ',ListPrice
FROM Production.Product
where ListPrice between 100 and 200
order by ListPrice

--11
SELECT 
    rowguid,
    Name,
    SalesPersonID,
    Demographics
INTO store_Archive
FROM Sales.Store;

SELECT *
FROM store_Archive;

SELECT 
    rowguid,
    Name,
    SalesPersonID,
    Demographics
INTO store_Archive2
FROM Sales.Store
WHERE 1 = 0;

--12
SELECT CONVERT(VARCHAR(30), GETDATE(), 101) AS [Date_Style]  -- mm/dd/yyyy
UNION
SELECT CONVERT(VARCHAR(30), GETDATE(), 103)                  -- dd/mm/yyyy
UNION
SELECT CONVERT(VARCHAR(30), GETDATE(), 105)                  -- dd-mm-yyyy
UNION
SELECT CONVERT(VARCHAR(30), GETDATE(), 106)                  -- dd mon yyyy
UNION
SELECT CONVERT(VARCHAR(30), GETDATE(), 108)                  -- hh:mm:ss (time only)
UNION
SELECT CONVERT(VARCHAR(30), GETDATE(), 120);                 -- yyyy-mm-dd hh:mm:ss



