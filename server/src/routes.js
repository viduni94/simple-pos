const express = require("express");
const router = express.Router();

//Controller files
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");

//Main route
router.get("/", (req, res) => res.send("Simple POS"));

// @route POST /user
// @desc Creates a new user
router.post("/user", userController.createUser);

// @route POST /login
// @desc Validate a user and login to the system
router.post("/login", loginController.validateUser);

module.exports = router;
