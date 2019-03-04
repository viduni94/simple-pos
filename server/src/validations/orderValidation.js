const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.orderDate = !isEmpty(data.orderDate) ? data.orderDate : "";

  if (isEmpty(data.orderItems)) {
    errors.orderItems = "There should be at least one item for an order.";
  }

  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    errors.userId = "Invalid user ID";
  }

  if (!mongoose.Types.ObjectId.isValid(data.customerId)) {
    errors.customerId = "Invalid customer ID";
  }

  if (Validator.isEmpty(data.orderDate)) {
    errors.orderDate = "The order date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
