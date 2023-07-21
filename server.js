// import express
const express = require("express");
// import mysql2
const mysql = require("mysql2");
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
    "Delete Employee Record",
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
  } else if (results.choice == "Delete Employee Record") {
    deleteEmployee();
  } else process.exit();
};

// view departments
async function viewDepartments() {
    const [ departments ] = await db.promise().query(
      "SELECT name AS Department, departments.id FROM departments"
      )
    console.table(departments)
    handleOptions();
}

// add department
async function addDepartment() {
  const name = await inquirer.prompt([
      {type: "input",
      name: "name",
      message: "Name of new department:"}
  ])
  const sql = "INSERT INTO departments SET ?";
  db.query(sql, name, (err, result) => {
      if (err) throw err;
      console.log(`${name.name} department added!`);
      viewDepartments()
  })
}

// view roles
async function viewRoles() {
    const [ roles ] = await db.promise().query(
      "SELECT title AS Role, departments.id, salary AS Salary, departments.name AS Department FROM roles LEFT JOIN departments on roles.department_id = departments.id"
    )
    console.table(roles)
    handleOptions();
}

// add role
async function addRole() {
  const [ departments ] = await db.promise().query("SELECT * FROM departments")
  const departmentArray = departments.map(({id, name}) => ({name: name, value:id}))
  const { title, salary, department_id } = await inquirer.prompt([
      {type: "input",
      name: "title",
      message: "Name of new role:"},
      {type: "number",
      name: "salary",
      message: "Salary of new role:"},
      {type: "list",
      name: "department_id",
      choices: departmentArray,
      message: "Department of new role:"}
  ])

  const sql = "INSERT INTO roles SET ?";
  const roleObj = { title, salary, department_id }

  db.query(sql, roleObj, (err, result) => {
    if (err) throw err;
  console.log(`${title} role added!`);
  viewRoles()
  }) 
}

// view employees
async function viewEmployees() {
    const [ employees ] = await db.promise().query(
      "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Name, employees.role_id, roles.title, roles.department_id, departments.name AS Department, roles.salary, employees.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id")
    console.table(employees)
    handleOptions();
}

// add employee
async function addEmployee() {
  const [ roles ] = await db.promise().query("SELECT * FROM roles")
  const rolesArray = roles.map(({id, title}) => ({name: title, value:id}))
  // const managerId = rolesArray.filter(role => role.name === "Manager")[0].value
  const [ manager ] = await db.promise().query("SELECT * FROM employees")
  const managersArray = manager.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value:id}))
  const {role_id, first_name, last_name, manager_id } = await inquirer.prompt([
      {type: "input",
      name: "first_name",
      message: "New employee's first name:"},
      {type: "input",
      name: "last_name",
      message: "New employee's last name:"},    
      {type: "list",
      name: "role_id",
      choices: rolesArray,
      message: "New employee's role:"},
      {type: "list",
      name: "manager_id",
      choices: managersArray,
      message: "New employee's manager:"
      }
      ])
  
  const sql = "INSERT INTO employees SET ?";
  const employeeObj = { role_id, first_name, last_name, manager_id }

  db.query(sql, employeeObj, (err, result) => {
    if (err) throw err;
  console.log(`${first_name} ${last_name} employee added!`);
  viewEmployees()
})
}

// update employee
async function updateEmployeeRole() {
  const [ roles ] = await db.promise().query("SELECT * FROM roles")
  const rolesArray = roles.map(({id, title}) => ({name: title, value:id}))
  const [ employees ] = await db.promise().query("SELECT * FROM employees")
  const employeesArray = employees.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value:id}))
  let employeeId 
  await inquirer.prompt([
      {type: "list",
      name: "id",
      choices: employeesArray,
      message: "Select employee to update:"
      },
      {type: "list",
      name: "role_title",
      choices: rolesArray,
      message: "Select employee new role:",
      }
  ]).then(response => {
      employeeId = response.id
      const sql = `UPDATE employees SET role_id = ? WHERE id = ${employeeId}`;
       db.query(sql, response.role_title, (err, result) => {
    if (err) throw err;
      console.log(`${employeeId} employee updated!`);
      viewEmployees()
      })
  })
}

// delete employee
async function deleteEmployee() {
  const [ employees ] = await db.promise().query("SELECT * FROM employees")
  const employeesArray = employees.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value:id}))
  let employeeId 
  await inquirer.prompt([
      {type: "list",
      name: "id",
      choices: employeesArray,
      message: "Select employee to delete:"
      }
  ]).then(response => {
      employeeId = response.id
      const sql = `DELETE FROM employees WHERE id = ${employeeId}`;
       db.query(sql, response.role_title, (err, result) => {
    if (err) throw err;
      console.log(`${employeeId} employee deleted!`);
      viewEmployees()
      })
  })
}

handleOptions();


