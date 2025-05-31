const express = require("express");
const appRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

//middleware to parse json body 
app.use(express.json())

//mount the user route
app.use(appRoutes)

app.listen(port, () => {
  console.log("server is running.");
});
