const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  itemCount: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  orderItems: [
    {
      foodItem: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true
      },
      itemCount: {
        type: Number,
        default: 1
      }
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
