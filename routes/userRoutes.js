const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//Define a route to retrieve user
router.get('/users', userController.getUsers);

router.post('/users', userController.addUser);

module.exports = router;