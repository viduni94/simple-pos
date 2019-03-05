const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller files
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const orderController = require("./controllers/orderController");
const customerController = require("./controllers/customerController");
const menuController = require("./controllers/menuController");
const foodItemController = require("./controllers/foodItemController");

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

// @route GET /order/:id
// @desc Get an order by id
router.get("/order/:id", passport.authenticate("jwt", { session: false }), orderController.getOrder);

// @route POST /order/orderItem/:id
// @desc Add an order item to an order
router.post("/order/orderItem/:id", passport.authenticate("jwt", { session: false }), orderController.addOrderItem);

// @route DELETE /order/orderItem
// @desc Remove an order item from an order
router.delete("/order/orderItem/:orderId/:itemId", passport.authenticate("jwt", { session: false }), orderController.deleteOrderItem);

// @route POST /foodItem
// @desc Create a food item
router.post("/foodItem", passport.authenticate("jwt", { session: false }), foodItemController.createFoodItem);

// @route GET /foodItem
// @desc Get all food items
router.get("/foodItem", passport.authenticate("jwt", { session: false }), foodItemController.getFoodItems);

// @route POST /customer
// @desc Create a customer
router.post("/customer", passport.authenticate("jwt", { session: false }), customerController.createCustomer);

// @route POST /menu
// @desc Create a menu
router.post("/menu", passport.authenticate("jwt", { session: false }), menuController.createMenu);

module.exports = router;
