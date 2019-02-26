const FoodItem = require("../models/FoodItemModel");
const validateFoodItemInput = require("../validations/foodItemValidation");

exports.createFoodItem = (req, res) => {
  const { errors, isValid } = validateFoodItemInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newFoodItem = new FoodItem({
    name: req.body.name,
    unitPrice: req.body.unitPrice,
    menuId: req.body.menuId,
    category: req.body.category
  });

  newFoodItem
    .save()
    .then(foodItem => res.json(foodItem))
    .catch(err => console.log(err));
};

exports.getFoodItems = (req, res) => {
  FoodItem.find({}, (err, foodItems) => {
    if (!err) {
      res.json(foodItems);
    } else {
      console.log(err);
    }
  });
};
