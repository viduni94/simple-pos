const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller files
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");

//Main route
router.get("/", (req, res) => res.send("Simple POS"));

// @route POST /user
// @desc Register a new user
router.post("/user", userController.createUser);

// @route POST /login
// @desc Validate a user and login to the system / Returns JWT token
router.post("/login", loginController.validateUser);

// @route GET /currentUser
// @desc Get current user
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  userController.getCurrentUser
);

module.exports = router;
