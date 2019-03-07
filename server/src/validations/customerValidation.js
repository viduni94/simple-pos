const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.userId = !isEmpty(data.userId) ? data.userId : "";

  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    errors.userId = "Invalid user ID";
  }

  if (!Validator.isLength(data.mobile, { min: 10, max: 10 })) {
    errors.mobile = "Mobile number is invalid.";
  }

  if (Validator.isEmpty(data.fname)) {
    errors.fname = "The name field is required.";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "The mobile field is required.";
  }

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = "Name must be 2 and 30 characters.";
  }

  if (isEmpty(data.userId)) {
    errors.userId = "The user ID field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
