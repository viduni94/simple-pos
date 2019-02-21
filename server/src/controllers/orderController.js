const Order = require("../models/OrderModel");
const validateOrderInput = require("../validations/orderValidation");

exports.createOrder = (req, res) => {
  const { errors, isValid } = validateOrderInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newOrder = new Order({
    orderDate: req.body.orderDate,
    itemCount: req.body.itemCount,
    userId: req.body.userId,
    customerId: req.body.customerId
  });

  newOrder
    .save()
    .then(order => res.json(order))
    .catch(err => console.log(err));
};

exports.getAllOpenOrders = (req, res) => {
  Order.find({ status: true }, (err, orders) => {
    if (!err) {
      res.json(orders);
    } else {
      console.log(err);
    }
  });
};
