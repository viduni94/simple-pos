const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true,
    get: getPrice,
    set: setPrice
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: "menu",
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

function getPrice(num) {
  return (num / 100).toFixed(2);
}

function setPrice(num) {
  return num * 100;
}

module.exports = FoodItem = mongoose.model("foodItem", FoodItemSchema);
