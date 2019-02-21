const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

module.exports = function validateFoodItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.unitPrice = !isEmpty(data.unitPrice) ? data.unitPrice : "";

  if (!mongoose.Types.ObjectId.isValid(data.menuId)) {
    errors.menuId = "Invalid menu ID";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "The name field is required.";
  }

  if (Validator.isEmpty(data.unitPrice)) {
    errors.unitPrice = "The unit price field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
