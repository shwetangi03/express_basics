const userService = require("../service/userService");

const getUsers = (req, res) => {
  // Read the JSON file
  let users;
  users = userService.readingFile();

  //filter the users based on the query parameters
  users = userService.sortingDataByParams(req.query, users);

  res.json(users);
};

const addUser = (req, res) => {
  const newUser = req.body;

  if (!newUser.id || !newUser.username || !newUser.age) {
    return res.status(400).json({ error: "id, username, and age are required" });
  }

  const updatedUsers = userService.writeToFile(newUser);
  res.status(201).json(updatedUsers);
};

module.exports = { getUsers, addUser };
