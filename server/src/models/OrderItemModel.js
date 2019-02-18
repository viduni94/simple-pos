const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  foodItemId: {
    type: Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = OrderItem = mongoose.model("orderItems", OrderItemSchema);
