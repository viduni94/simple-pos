const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller files
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const orderController = require("./controllers/orderController");
const customerController = require("./controllers/customerController");

//Main route
router.get("/", (req, res) => res.send("Simple POS"));

// @route POST /user
// @desc Register a new user
router.post("/user", userController.createUser);

// @route POST /login
// @desc Validate a user and login to the system / Returns JWT token
router.post("/login", loginController.validateUser);

// @route GET /profile
// @desc Get current user
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.getUserProfile);

// @route GET /order
// @desc Get all open orders
router.get("/order", passport.authenticate("jwt", { session: false }), orderController.getAllOpenOrders);

// @route POST /order
// @desc Create an order
router.post("/order", passport.authenticate("jwt", { session: false }), orderController.createOrder);

// @route PUT /order/:id
// @desc Create an order
// router.put("/order", passport.authenticate("jwt", { session: false }), dashboardController.editOrder);

// @route POST /customer
// @desc Create a customer
router.post("/customer", passport.authenticate("jwt", { session: false }), customerController.createCustomer);

module.exports = router;
