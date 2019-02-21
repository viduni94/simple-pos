const Menu = require("../models/MenuModel");
const Validator = require("validator");
const isEmpty = require("../validations/is-empty");

exports.createMenu = (req, res) => {
  let errors = {};

  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";

  if (Validator.isEmpty(req.body.name)) {
    errors.name = "The name field is required.";
    return res.status(400).json(errors);
  }
  const newMenu = new Menu({
    name: req.body.name
  });

  newMenu
    .save()
    .then(menu => res.json(menu))
    .catch(err => console.log(err));
};
