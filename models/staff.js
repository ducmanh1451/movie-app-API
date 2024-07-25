const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authority: {
    type: Number,
    required: true,
  },
  belong_cinema: {
    type: String,
  },
  belong_cinema_name: {
    type: String,
  },
  gender: {
    type: Number,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
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

const Staff = mongoose.model("staffs", staffSchema);

module.exports = Staff;
