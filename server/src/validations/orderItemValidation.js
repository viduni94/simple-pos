const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.foodItem = !isEmpty(data.foodItem) ? data.foodItem : "";

  if (Validator.isEmpty(data.foodItem)) {
    errors.foodItem = "Food item ID is required.";
  }

  if (!mongoose.Types.ObjectId.isValid(data.foodItem)) {
    errors.foodItem = "Invalid food item ID.";
  }

  if (!isEmpty(data.itemCount)) {
    if (!Number.isInteger(data.itemCount)) {
      errors.itemCount = "The item count should be a number.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
