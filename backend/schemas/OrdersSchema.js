const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  option: { type: String, default: "MIS" },
  status: { type: String, default: "COMPLETE" },
  date: { type: Date, default: Date.now },
});

module.exports = { OrdersSchema };
// finalized
