const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateLoginInput = require("../validations/loginValidation");

exports.validateUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  User.findOne({ email })
    .then(user => {
      //Check for user
      if (!user) {
        errors.email = "User not found!";
        return res.status(404).json(errors);
      }

      //Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = { id: user.id, fname: user.fname, email: user.email }; //Create jwt payload

          //Sign token - Token expires in 24 hours
          jwt.sign(payload, keys.secret, { expiresIn: 86400 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password incorrect!";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => res.json(err));
};
