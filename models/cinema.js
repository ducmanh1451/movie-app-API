const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  cinema_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  district: {
    type: String,
  },
  city: {
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

const Cinema = mongoose.model("cinemas", cinemaSchema);

module.exports = Cinema;
