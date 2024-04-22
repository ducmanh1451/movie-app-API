const Cinema = require("./../models/cinema");
const mongoose = require("mongoose");

module.exports = {
  // get all cinemas
  async getAllCinemas() {
    return Cinema.find({ delete_date: null });
  },
  // create
  async addNewCinema(cinema) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Cinema.create(cinema);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // update
  async updateCinema(_id, cinema) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Cinema.findByIdAndUpdate(
        _id,
        { $set: cinema },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete
  async deleteCinema(_id, cinema) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Cinema.findByIdAndUpdate(
        _id,
        { $set: cinema },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
