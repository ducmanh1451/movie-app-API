const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
  },
  director: {
    type: String,
  },
  actors: {
    type: [String],
  },
  rating: {
    type: Number,
  },
  movie_type: {
    type: Number,
  },
  content: {
    type: String,
  },
  poster: {
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

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
