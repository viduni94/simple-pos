const express = require('express');
const router = express.Router();

//Controller files
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

//Create new user route
router.post('/user', userController.createUser);

//Validate user route
router.post('/login', loginController.validateUser);

module.exports = router;