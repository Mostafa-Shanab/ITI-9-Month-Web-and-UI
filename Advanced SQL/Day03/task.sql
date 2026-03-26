-- Q1
SELECT 
    first_name,
    last_name,
    salary,
	dept_id,
    RANK() OVER (ORDER BY salary DESC) AS rank_value,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_value
FROM professors;
SELECT 
    dept_id,
    first_name,
    salary,
	dept_id,
    RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept,
    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dense_rank_in_dept
FROM professors;


-- Q2
SELECT 
    student_id,
    first_name,
    enroll_date,
    gpa,
    LAG(gpa) OVER (ORDER BY enroll_date) AS prev_gpa,
    LEAD(gpa) OVER (ORDER BY enroll_date) AS next_gpa
FROM students;

-- Q3
SELECT 
    scholarship_id,
    amount,
    start_date,
    SUM(amount) OVER (ORDER BY start_date) AS running_total
FROM scholarships;

-- Q4
SELECT 
    student_id,
    first_name,
    gpa,
    NTILE(4) OVER (ORDER BY gpa DESC) AS quartile,
    CASE 
        WHEN NTILE(4) OVER (ORDER BY gpa DESC) = 1 THEN 'Top'
        WHEN NTILE(4) OVER (ORDER BY gpa DESC) = 2 THEN 'Good'
        WHEN NTILE(4) OVER (ORDER BY gpa DESC) = 3 THEN 'Average'
        ELSE 'Low'
    END AS label
FROM students;

-- Q5
SELECT 
    course_code,
    SUBSTRING(course_code FROM 1 FOR 3) AS first_3_chars,
    REGEXP_INSTR(course_code, '\d') AS first_digit_position
FROM courses;

-- Q6
CREATE OR REPLACE FUNCTION get_dept_student_count(dept_id INT)
RETURNS INT AS $$
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM students 
        WHERE students.dept_id = get_dept_student_count.dept_id
    );
END;
$$ LANGUAGE plpgsql;
SELECT get_dept_student_count(3);

-- Q7
CREATE OR REPLACE FUNCTION give_gpa_bonus(dept_id INT, bonus_percent NUMERIC)
RETURNS TABLE (
    student_name TEXT,
    old_gpa NUMERIC,
    new_gpa NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        first_name || ' ' || last_name,
        gpa,
        gpa + (gpa * bonus_percent / 100)
    FROM students
    WHERE students.dept_id = give_gpa_bonus.dept_id;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM give_gpa_bonus(3, 10);

-- Q8
CREATE OR REPLACE PROCEDURE transfer_student(student_id INT, new_dept_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE students
    SET dept_id = new_dept_id
    WHERE students.student_id = transfer_student.student_id;

    RAISE NOTICE 'Student % transferred to department %', student_id, new_dept_id;
END;
$$;
CALL transfer_student(1, 3);









