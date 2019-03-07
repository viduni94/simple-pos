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
// exports.getOrder = (req, res) => {
//   console.log(req.params.id);
//   Order.findOne({ _id: req.params.id })
//     .populate("customer")
//     .exec((err, order) => {
//       if (!err) {
//         res.json(order);
//       } else {
//         console.log(err);
//       }
//     });
// };

exports.addOrderItem = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .then(order => {
      const newOrderItem = {
        foodItem: req.body.foodItem,
        itemCount: req.body.itemCount
      };

      const selectedItem = order.orderItems.filter(item => item.foodItem.equals(req.body.foodItem));

      if (selectedItem.length !== 0) {
        selectedItem[0].itemCount = selectedItem[0].itemCount + newOrderItem.itemCount;
      } else {
        //Add to orderItem array
        order.orderItems.unshift(newOrderItem);
      }

      order.save((err, order) => {
        if (err) {
          console.log(err);
        } else {
          Order.findOne({ _id: order._id })
            .populate("orderItems.foodItem")
            .populate("customer")
            .then(order => res.json(order));
        }
      });
    })
    .catch(err => res.status(404).json(err));
};

exports.deleteOrderItem = (req, res) => {
  Order.findOne({ _id: req.params.orderId })
    .then(order => {
      let selectedItem;
      if (order.orderItems.length > 0) {
        selectedItem = order.orderItems.filter(item => item.id === req.params.itemId);
      } else {
        return res.json(order);
      }

      if (selectedItem[0].itemCount > 1) {
        selectedItem[0].itemCount = selectedItem[0].itemCount - 1;
      } else {
        const removeIndex = order.orderItems.map(item => item.id).indexOf(req.params.itemId);
        //Splice out of the array
        order.orderItems.splice(removeIndex, 1);
      }
      order.save((err, order) => {
        if (err) {
          console.log(err);
        } else {
          Order.findOne({ _id: order._id })
            .populate("orderItems.foodItem")
            .populate("customer")
            .then(order => res.json(order));
        }
      });
    })
    .catch(err => res.status(404).json(err));
};

exports.checkoutOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then(order => {
      order.status = false;
      order.save((err, order) => {
        if (err) {
          console.log(err);
        } else {
          Order.findOne({ _id: order._id })
            .populate("orderItems.foodItem")
            .populate("customer")
            .then(order => res.json(order));
        }
      });
    })
    .catch(err => res.status(404).json(err));
};
