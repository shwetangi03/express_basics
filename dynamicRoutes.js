const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("hello shwetangi, your express is running.");
});

app.get("/home", (req, res) => {
  res.send("this is my home.");
});

// app.get("/home/1", (req, res) => {
//   res.send("this is my product1.");
// });

// app.get("/home/2", (req, res) => {
//   res.send("this is my product 2.");
// });

app.get("/home/:productid", (req, res) => {
  const id = req.params.productid;
  const name = req.query.name;
  const age = req.query.age;
  res.send(`this is my product ${id}- name${name}- age ${age}.`);
});

app.get("/about", (req, res) => {
  res.send("this is my about.");
});

app.listen(port, () => {
  console.log("server is running.");
});
