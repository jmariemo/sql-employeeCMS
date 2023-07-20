// import express
const express = require("express");
// import mysql2
const mysql = require("mysql2");
// import inquirer
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to db
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "cash",
    database: "employees_db",
  },
  console.log("Connected to the employees_db database!")
);

// CLI database home options
async function handleOptions() {
  const options = [
    "View Departments",
    "Add Department",
    "View Roles",
    "Add Role",
    "View Employees",
    "Add Employee",
    "Update Employee Role",
    "Quit",
  ];

  const results = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message:
        "Welcome to SqlMS, a SQL Employee Management System. What would you like to do?",
      choices: options,
    },
  ]);
  if (results.choice == "View Departments") {
    viewDepartments();
  } else if (results.choice == "Add Department") {
    addDepartment();
  } else if (results.choice == "View Roles") {
    viewRoles();
  } else if (results.choice == "Add Role") {
    addRole();
  } else if (results.choice == "View Employees") {
    viewEmployees();
  } else if (results.choice == "Add Employee") {
    addEmployee();
  } else if (results.choice == "Update Employee Role") {
    updateEmployeeRole();
  } else process.exit();
}

// view departments
const viewDepartments = async () => {
  const [rows, fields] = await db.promise().query("SELECT * FROM DEPARTMENTS");
  console.table(rows);
  handleOptions();
};

// add department
async function addDepartment() {
  const newDepartment = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "Enter new department name:",
    validate: (departmentInput) => {
      if (departmentInput == "") {
        console.log("Enter new department name:");
        return false;
      } else {
        return true;
      }
    },
  });

  const sql = "INSERT INTO departments (name) VALUES (?)";
  const params = newDepartment.departmentName;

  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log("Department added");
    handleOptions();
  });
}

// view roles
const viewRoles = async () => {
  const [rows, fields] = await db
    .promise()
    .query(
      "SELECT * FROM roles JOIN departments ON roles.department_id = departments.id"
    );
  console.table(rows);
  handleOptions();
};

// add role

// view employees
const viewEmployees = async () => {
  const [rows, fields] = await db
    .promise()
    .query(
      "SELECT * FROM EMPLOYEES JOIN roles ON employees.role_id = roles.id"
    );
  console.table(rows);
  handleOptions();
};

// add employee

// update employee role

handleOptions();


