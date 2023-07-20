// import express
const express = require("express");
// import mysql2
const mysql = require("mysql2");

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
    database: "employees_db"
  },
  console.log("Connected to the employees_db database!")
);