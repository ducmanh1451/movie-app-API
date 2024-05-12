const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
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
  showtime_detail: [
    {
      movie_id: {
        type: String,
        required: true,
      },
      movie_name: {
        type: String,
        required: true,
      },
      movie_duration: {
        type: Number,
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

const Showtime = mongoose.model("showtimes", showtimeSchema);

module.exports = Showtime;
