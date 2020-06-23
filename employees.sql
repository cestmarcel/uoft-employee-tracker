DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Marketing"), ("HR"), ("Controlling");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1), ("Senior Engineer", 120000, 1), ("Junior Engineer", 90000, 1),
("Finance Lead", 100000, 2), ("Accountant", 75000, 2), ("Marketing Director", 110000, 3),
("Marketing Manager", 65000, 3), ("Head of HR", 150000, 4), ("Recruiter", 55000, 4), ("Controlling Lead", 90000, 5),
("Controller", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1), ("Mike", "Chan", 2), ("Ashley", "Rodriguez", 3), 
("Kevin", "Tupik", 4), ("Malia", "Miller", 6), ("Sarah", "Lourd", 8), 
("Tom", "Allen", 9), ("Christian", "Eckenrode", 10), ("Alexis", "Rose", 11);

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
FROM department
JOIN role
ON department.id = role.department_id
JOIN employee
ON role.id = employee.role_id; 