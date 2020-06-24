// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'employees'
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database! Starting employee tracker...");
    afterConnection();
});

function printDivider(){
  console.log("");
  console.log("---------------------------------------------");
  console.log("");
}

function afterConnection() {
    printDivider();
    console.log("WELCOME TO THE EMPLOYEE TRACKER");
    console.log("");
    displayOptions();
  }

async function displayOptions(){
  await inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "View all departments", "View all roles", "View all employees by department", "Add employee", "Add department", "Add role", "Remove employee", "Update employee role", "[X] Exit application"]
    })
    .then(function(answer){
      switch(answer.task){
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees by department":
          viewEmployeesByDepartment();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          console.log("Update!");
          break;
        case "Exit application":
          connection.end();
          break;
      }
    }
  )}

function viewAllEmployees() {
  printDivider();
  console.log("Here's an overview of all employees:");
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id ORDER BY employee.id ASC;", function(err, res) {
    if (err) throw err;
    console.table(res);
    displayOptions();
  });
}

function viewAllDepartments() {
  printDivider();
  console.log("Here are all the company's departments:");
  connection.query("SELECT department.name FROM department;", function(err, res) {
    if (err) throw err;
    console.table(res);
    displayOptions();
  });
}

function viewAllRoles() {
  printDivider();
  console.log("Here are all the available roles:");
  connection.query("SELECT role.title, role.salary, department.name AS department FROM department JOIN role ON department.id = role.department_id ORDER BY department.name ASC;", function(err, res) {
    if (err) throw err;
    console.table(res);
    displayOptions();
  });
}

function viewEmployeesByDepartment() {
  printDivider();
  console.log("Here's an overview of all employees by department:");
  connection.query("SELECT department.name, employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id ORDER BY department.name ASC;", function(err, res) {
    if (err) throw err;
    console.table(res);
    displayOptions();
  });
}

function addEmployee(){
  connection.query("SELECT title FROM role", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
      {
        name: "newEmployeeFirst",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "newEmployeeLast",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "newEmployeeRole",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].title);
          }
          return choiceArray;
        },
        message: "What is the new employee's role?"
      }
    ])
    .then(async function(answer){
      var roleId = await getRoleId(answer);
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.newEmployeeFirst,
          last_name: answer.newEmployeeLast,
          role_id: roleId
        },
        function(err, res) {
          if (err) throw err;
          console.log("Employee added successfully!")
          displayOptions();
        })
    })
  }
)}

async function getRoleId(input){
  console.log(input);
    return new Promise((resolve, reject) =>{
      connection.query("SELECT id FROM role WHERE ?",
      {
        title: input.newEmployeeRole
      }, 
      function(err, results) {
        if (err) throw err;
        resolve(results[0].id); 
      });
    });
}

function addDepartment(){
    inquirer
      .prompt({
        name: "newDepartmentName",
        type: "input",
        message: "What is the new department's name?"
      })
    .then(async function(answer){
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newDepartmentName
        },
        function(err, res) {
          if (err) throw err;
          console.log("Department successfully added!")
          displayOptions();
        })
    })
}

function addRole(){
  connection.query("SELECT name FROM department", function(err, results) {
    if (err) throw err;
  inquirer
    .prompt([
      {
        name: "newRoleTitle",
        type: "input",
        message: "What is the new role's name?"
      },
      {
        name: "newRoleSalary",
        type: "input",
        message: "What is the new role's salary?"
      },
      {
        name: "newRoleDepartment",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].name);
          }
          return choiceArray;
        },
        message: "What is the new role's department?"
      }
    ])
  .then(async function(answer){
    console.log(answer);
    var departmentId = await getDepartmentId(answer);
    var query = connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.newRoleTitle,
        salary: answer.newRoleSalary,
        department_id: departmentId
      },
      function(err, res) {
        if (err) throw err;
        console.log("Role successfully added!")
        displayOptions();
      })
    })
  })
}

async function getDepartmentId(input){
    return new Promise((resolve, reject) =>{
      connection.query("SELECT id FROM department WHERE ?",
      {
        name: input.newRoleDepartment
      }, 
      function(err, results) {
        if (err) throw err;
        resolve(results[0].id); 
      });
    });
}

function removeEmployee(){
  var toSplit;
  var splitResult;
  connection.query("SELECT first_name, last_name FROM employee", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeToDelete",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name + " " + results[i].last_name);
            }
            return choiceArray;
          },
          message: "Which employee would you like to delete?"
        }
      ])
      .then(function(result){
        toSplit = result.employeeToDelete;
        splitResult = toSplit.split(" ");
        return splitResult;
      })
      .then(function(result){
        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", 
        [
          splitResult[0],
          splitResult[1]
        ], 
        function(err, results) {
          if (err) throw err;
          console.log(`Successfully removed ${toSplit} from the database!`);
          displayOptions();
      });
    }
  )}
)}