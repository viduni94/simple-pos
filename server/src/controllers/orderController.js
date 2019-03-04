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
    user: req.body.userId,
    customer: req.body.customerId,
    orderItems: req.body.orderItems
  });

  newOrder
    .save()
    .then(order => {
      res.json(order);
      console.log(order.id);
    })
    .catch(err => console.log(err));
};

// Get all open orders
exports.getAllOpenOrders = (req, res) => {
  Order.find({ status: true })
    .populate("customer")
    .populate("orderItems.foodItem")
    .exec((err, orders) => {
      if (!err) {
        res.json(orders);
      } else {
        console.log(err);
      }
    });
};

//Get a single order by id
exports.getOrder = (req, res) => {
  console.log(req.params.id);
  Order.findOne({ _id: req.params.id })
    .populate("customer")
    .exec((err, order) => {
      if (!err) {
        res.json(order);
      } else {
        console.log(err);
      }
    });
};

exports.addOrderItem = (req, res) => {
  Order.findOne({ _id: req.body.orderId }).then(order => {
    // TODO: if a fooditem exists, increase count

    // order.orderItems.forEach(function(orderItem) {
    //   if (orderItem.map(item => item.foodItem).indexOf(req.body.foodItem)) {
    //     orderItem.itemCount = orderItem.itemCount + 1;
    //   }
    // });

    const newOrderItem = {
      foodItem: req.body.foodItem,
      itemCount: req.body.itemCount
    };

    //Add to orderItem array
    order.orderItems.unshift(newOrderItem);

    order.save().then(order => {
      order.populate("orderItems.foodItem");
      res.json(order);
    });
  });
};

exports.deleteOrderItem = (req, res) => {
  //TODO: Delete only if item count is equal to 1, if not, decrease item count

  Order.findOne({ _id: req.params.id })
    .then(order => {
      //Get remove index
      const removeIndex = order.orderItems.map(item => item.id).indexOf(req.params.orderItemId);

      //Splice out of the array
      order.orderItems.splice(removeIndex, 1);

      // save
      order.save().then(order => res.json(order));
    })
    .catch(err => res.status(404).json(err));
};
