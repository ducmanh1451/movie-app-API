const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  create_date: {
    type: Date,
  },
  update_date: {
    type: Date,
  },
  delete_date: {
    type: Date,
  },
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
