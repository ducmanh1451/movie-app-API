const Movie = require("./../models/movie");

module.exports = {
  // get all movies
  async getAllMovies() {
    return Movie.find({});
  },
};
