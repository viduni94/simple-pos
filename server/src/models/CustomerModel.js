const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
