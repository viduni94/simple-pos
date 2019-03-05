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
    user: req.body.userId,
    customer: req.body.customerId,
    orderItems: req.body.orderItems
  });

  newOrder
    .save()
    .then(order => {
      res.json(order);
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

    const newOrderItem = {
      foodItem: req.body.foodItem,
      itemCount: req.body.itemCount
    };

    index = order.orderItems.findIndex(e => e.foodItem === newOrderItem.foodItem);
    if (index > -1) {
      order.orderItems[index].itemCount = order.orderItems[index].itemCount + newOrderItem.itemCount;
      console.log(index);
    } else {
      //Add to orderItem array
      order.orderItems.unshift(newOrderItem);
      console.log("new item");
    }

    order.save().then(order => {
      order.populate("orderItems.foodItem");
      res.json(order);
      console.log(order);
    });
  });
};

exports.deleteOrderItem = (req, res) => {
  //TODO: Delete only if item count is equal to 1, if not, decrease item count

  Order.findOne({ _id: req.params.orderId })
    .then(order => {
      //Get remove index
      const selectedItem = order.orderItems.filter(item => item.id === req.params.itemId);
      if (selectedItem[0].itemCount > 1) {
        selectedItem[0].itemCount = selectedItem[0].itemCount - 1;
      } else {
        const removeIndex = order.orderItems.map(item => item.id).indexOf(req.params.itemId);
        //Splice out of the array
        order.orderItems.splice(removeIndex, 1);
      }
      order.populate("orderItems.foodItem").execPopulate();
      order.save().then(order => res.json(order));
      console.log(order);
    })
    .catch(err => res.status(404).json(err));
};
