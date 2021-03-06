const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: true
  },
  orderItems: [
    {
      foodItem: {
        type: Schema.Types.ObjectId,
        ref: "foodItem",
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
