-- Q1
INSERT INTO faculties (faculty_name, dean, building, budget)
VALUES ('Faculty of Law', 'Dr. Hany Aziz', 'G', 8000000)
RETURNING faculty_id;

-- Q2
UPDATE professors
SET salary = salary * 1.15
WHERE dept_id = 3
RETURNING 
    first_name, 
    last_name,
    salary / 1.15 AS old_salary, 
    salary AS new_salary;

-- Q3
UPDATE students
SET is_active = FALSE
WHERE gpa < 2.0 
  AND enroll_date < '2022-01-01'
RETURNING first_name, last_name;

-- Q4
INSERT INTO enrollments (student_id, course_id, semester, year)
VALUES (5, 1, 'Fall', 2023)
ON CONFLICT DO NOTHING;
-- ON CONFLICT (student_id, course_id, semester, year) DO NOTHING;

-- Q5
UPDATE enrollments
SET grade = 98,
    letter_grade = 'A+'
WHERE student_id = 1 
  AND course_id = 3 
  AND semester = 'Fall' 
  AND year = 2022;

-- Q6
MERGE INTO students s
USING (SELECT 99 AS student_id, 'New Address' AS address) src
ON s.student_id = src.student_id
WHEN MATCHED THEN
  UPDATE SET address = src.address
WHEN NOT MATCHED THEN
  INSERT (student_id, address)
  VALUES (src.student_id, src.address);

-- Q7
SELECT *
INTO high_gpa_students
FROM students
WHERE gpa >= 3.5;

-- Q8
CREATE TABLE dept_summary AS
SELECT 
    d.dept_name,
    COUNT(s.student_id) AS student_count,
    AVG(s.gpa) AS avg_gpa,
    COALESCE(SUM(sc.amount), 0) AS total_scholarship
FROM departments d
LEFT JOIN students s 
    ON d.dept_id = s.dept_id
LEFT JOIN scholarships sc 
    ON s.student_id = sc.student_id
GROUP BY d.dept_name;

-- Q9 only structure
CREATE TABLE enrollments_copy_structure
AS TABLE enrollments WITH NO DATA;

-- Q9 structure + data + constraints
CREATE TABLE enrollments_copy_all
(LIKE enrollments INCLUDING ALL);

-- Q10
CREATE TABLE exam_results (
    id SERIAL PRIMARY KEY,
    status TEXT DEFAULT 'pending',
    score INT DEFAULT 0,
    exam_date DATE DEFAULT CURRENT_DATE,
    created_by TEXT DEFAULT CURRENT_USER
);
INSERT INTO exam_results DEFAULT VALUES;
INSERT INTO exam_results (status, score)
VALUES ('completed', 95);

-- Q11
SELECT 
    first_name,
    last_name,
    metadata->'hobbies'->>0 AS first_hobby,
    jsonb_array_length(metadata->'languages') AS num_languages,
    metadata->>'laptop' AS has_laptop
FROM students
WHERE metadata IS NOT NULL;

-- Q12
CREATE TYPE student_level AS ENUM 
('Freshman', 'Sophomore', 'Junior', 'Senior');
ALTER TABLE students
ADD COLUMN level student_level;
UPDATE students
SET level = CASE
    WHEN gpa < 2 THEN 'Freshman'
    WHEN gpa < 3 THEN 'Sophomore'
    WHEN gpa < 3.5 THEN 'Junior'
    ELSE 'Senior'
END;

-- Q13
CREATE TYPE contact_info AS (
    phone TEXT,
    email TEXT,
    city TEXT
);
CREATE TABLE student_contacts (
    student_id INT,
    contact contact_info
);
INSERT INTO student_contacts
VALUES (1, ('01012345678', 'test@mail.com', 'Cairo'));
