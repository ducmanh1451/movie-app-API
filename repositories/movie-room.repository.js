const MovieRoom = require("./../models/movie-room");
const mongoose = require("mongoose");

module.exports = {
  // create
  async addNewMovieRoom(movieRoom) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await MovieRoom.create(movieRoom);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
