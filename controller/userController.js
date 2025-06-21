const userService = require("../service/userService");
const { sendErrorResponse, sendResponse } = require("../utils/response");

const getUsers = async (req, res) => {
  try {
    // Read the JSON file
    let users;
    users = userService.readingFile();

    //filter the users based on the query parameters
    users = userService.sortingDataByParams(req.query, users);

    if (users > 10) {
      return sendErrorResponse(res, {
        message: "No users found",
        statusCode: 404,
      });
    }

    return sendResponse(res, users, 200);
  } catch (error) {
    return sendErrorResponse(res, {
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = req.body;

    if (!newUser.id || !newUser.username || !newUser.age) {
      return sendErrorResponse(res, {
        message: "id, username, and age are required",
        statusCode: 400,
      });
    }

    const updatedUsers = userService.writeToFile(newUser);
    return sendResponse(res, updatedUsers, 201);
  } catch (error) {
    return sendErrorResponse(res, {
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

module.exports = { getUsers, addUser };
