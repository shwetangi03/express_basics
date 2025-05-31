const fs = require("fs");
const path = require("path");

const readingFile = () => {
  const filePath = path.join(__dirname, "../data/user.json");
  const data = fs.readFileSync(filePath, "utf8");
  let users = JSON.parse(data);
  return users;
};

const sortingDataByParams = (query, users) => {
  if (query.age) {
    const age = parseInt(query.age);
    users = users.filter((user) => user.age === age);
  }

  //sort users by username if requested
  if (query.sortBy === "username") {
    users.sort((a, b) => a.username.localeCompare(b.username));
  }

  return users;
};

const writeToFile = (newUser) => {
  const filePath = path.join(__dirname, "../data/user.json");

  const existingUsers = readingFile(); // returns array

  existingUsers.push(newUser); // ✅ only push one user object

  fs.writeFileSync(filePath, JSON.stringify(existingUsers, null, 2), "utf8");

  return existingUsers;
};


module.exports = {
  readingFile,
  sortingDataByParams,
  writeToFile,
};
