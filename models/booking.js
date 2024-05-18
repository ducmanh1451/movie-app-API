const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  booking_name: {
    type: String,
    required: true,
  },
//   address: {
//     type: String,
//     required: true,
//   },
//   phone_number: {
//     type: String,
//   },
//   district: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
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

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
