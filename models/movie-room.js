const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  cinema_id: {
    type: String,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
  seats: [
    {
      seat_id: {
        type: Number,
        required: true,
      },
      selected: {
        type: Boolean,
        default: false,
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
    },
  ],
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

const MovieRoom = mongoose.model("movierooms", movieSchema);

module.exports = MovieRoom;
