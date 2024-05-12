const Showtime = require("./../models/showtime");
const mongoose = require("mongoose");

module.exports = {
  // get all showtimes
  async getAllShowtimes() {
    try {
      const showtimes = await Showtime.find({ delete_date: null });
      // count showtime detail
      const showtimesWithCounts = await Promise.all(
        showtimes.map(async (showtime) => {
          const count = showtime.showtime_detail.length;
          return { ...showtime._doc, count };
        })
      );
      return showtimesWithCounts;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả lịch chiếu:", error);
      throw error;
    }
  },
  // create
  async addNewShowtime(showtime) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Showtime.create(showtime);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // update
  async updateShowtime(_id, showtime) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Showtime.findByIdAndUpdate(_id, { $set: { showtime_detail: [] } });

      return await Showtime.findByIdAndUpdate(
        _id,
        { $set: showtime },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete
  async deleteShowtime(_id, showtime) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Showtime.findByIdAndUpdate(
        _id,
        { $set: showtime },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
