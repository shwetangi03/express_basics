const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shwetangi2003",
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connection has been created");

  const userTable = `CREATE TABLE IF NOT EXISTS UserTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`;

  const bussesTable = `CREATE TABLE IF NOT EXISTS BussesTable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber INT(20),
      totalSeats INT(20),
      availableSeats INT(20)
  )`;
  const bookingTable = `CREATE TABLE IF NOT EXISTS BookingTable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      seatNumber INT(20)
  )`;
  const paymentTable = `CREATE TABLE IF NOT EXISTS PaymentTable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amountPaid INT(20),
      paymentStatus VARCHAR(20)
  )`;
  const creationQuery = `CREATE TABLE IF NOT EXISTS Students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20)
  )`;

  connection.execute(userTable, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });
  connection.execute(bussesTable, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });
  connection.execute(bookingTable, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });
  connection.execute(paymentTable, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });

  connection.execute(creationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, (err) => {
  console.log("Server is running");
});
