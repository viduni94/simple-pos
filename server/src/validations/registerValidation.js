const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.fname)) {
    errors.fname = "The name field is required.";
  }

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = "Name must be 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "The email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "The password field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
