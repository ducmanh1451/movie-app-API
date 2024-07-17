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
  // refresh_token: {
  //   type: String,
  //   default: '',
  // },
  booking_history: {
    booking_id: {
      type: String,
    },
    cinema_name: {
      type: String,
    },
    room_name: {
      type: String,
    },
    movie_name: {
      type: String,
    },
    opening_start_time: {
      type: Date,
    },
    opening_end_time: {
      type: Date,
    },
    seats: {
      seat_id: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
    booking_date: {
      type: Date,
    },
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
