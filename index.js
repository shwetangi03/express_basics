const express = require("express");
const db = require("./utils/db-connection");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/student", studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
