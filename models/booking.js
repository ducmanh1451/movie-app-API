const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    required: true,
  },
  cinema_name: {
    type: String,
    required: true,
  },
  room_id: {
    type: String,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  movie_name: {
    type: String,
    required: true,
  },
  expected_start_date: {
    type: Date,
    required: true,
  },
  expected_end_date: {
    type: Date,
    required: true,
  },
  opening_date: {
    type: Date,
    required: true,
  },
  opening_start_time: {
    type: Date,
    required: true,
  },
  opening_end_time: {
    type: Date,
    required: true,
  },
  seats: [
    {
      seat_id: {
        type: Number,
        required: true,
      },
      seat_name: {
        type: String,
      },
      row: {
        type: Number,
        required: true,
      },
      column: {
        type: Number,
        required: true,
      },
      type: {
        type: Number,
        required: true,
        default: 0,
      },
      available: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Number,
        required: true,
      },
      customer: {
        customer_id: {
          type: String,
        },
        email: {
          type: String,
        },
        customer_name: {
          type: String,
        },
        payment_status: {
          type: Boolean,
        },
      },
      booking: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  rows: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
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

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
