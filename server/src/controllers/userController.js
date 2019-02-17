const User = require("../models/UserModel");

exports.createUser = (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    fname: req.body.fname,
    lname: req.body.lname
  })
    .then(user =>
      res.status(201).json({
        error: false,
        data: user,
        message: "New user has been created."
      })
    )
    .catch(err =>
      res.json({
        error: true,
        data: [],
        error: err
      })
    );
};
