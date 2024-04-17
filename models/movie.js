const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
