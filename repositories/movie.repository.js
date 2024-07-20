const Movie = require("./../models/movie");
const mongoose = require("mongoose");

module.exports = {
  // get all movies
  async getAllMovies() {
    const currentDate = new Date()
    return Movie.find({ delete_date: null, expected_end_date: { $gte: currentDate } });
  },

  // find movie
  async findMovie(_id) {
    return Movie.find({ _id: _id });
  },

  // get showing movies
  async getShowingMovies() {
    const currentDate = new Date()
    return Movie.find({ delete_date: null, movie_type: 1, expected_end_date: { $gte: currentDate } });
  },

  // get upcoming movies
  async getUpcomingMovies() {
    return Movie.find({ delete_date: null, movie_type: 0 });
  },

  // create movie
  async addNewMovie(movie) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Movie.create(movie);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // update movie
  async updateMovie(_id, movie) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Movie.findByIdAndUpdate(_id, { $set: movie }, { new: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete movie
  async deleteMovie(_id, movie) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Movie.findByIdAndUpdate(_id, { $set: movie }, { new: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
