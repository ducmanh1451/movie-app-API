const MovieRoom = require("./../models/movie-room");
const mongoose = require("mongoose");

module.exports = {
  // get all movies
  async getAllMovieRooms() {
    return MovieRoom.find({ delete_date: null });
  },
  // find by id
  async findMovieRoom(_id) {
    return MovieRoom.find({ _id: _id });
  },
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

  // update
  async updateMovieRoom(_id, movieRoom) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await MovieRoom.findByIdAndUpdate(
        _id,
        { $set: movieRoom },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete
  async deleteMovieRoom(_id, movieRoom) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await MovieRoom.findByIdAndUpdate(
        _id,
        { $set: movieRoom },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // get movie rooms by cinema_id
  async getMovieRoomsByCinemaId(cinema_id) {
    return MovieRoom.find({ cinema_id: cinema_id }, { _id: 1, room_name: 1 });
  },
};
