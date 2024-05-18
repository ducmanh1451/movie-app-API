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
          const opening_date = showtime.showtime_detail.length > 0 ? showtime.showtime_detail[0].opening_date : null;
          return { ...showtime._doc, count, opening_date };
        })
      );
      return showtimesWithCounts;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả lịch chiếu:", error);
      throw error;
    }
  },

  // get showtimes by movie and date
  async getShowtimesByMovieAndDate(movieId, date) {
    try {
      // const showtimes = await Showtime.find({
      //   'showtime_detail': {
      //     $elemMatch: {
      //       'movie_id': movieId,
      //       'opening_date': {
      //         $gte: new Date(date),
      //         $lt: new Date(date + 'T23:59:59.999Z')
      //       }
      //     }
      //   },
      //   delete_date: null // Không bị xóa
      // });
      // return showtimes;


      const dateFormat = new Date(date)
      dateFormat.setHours(0, 0, 0, 0);

      const showtimes = await Showtime.find({
        "showtime_detail.movie_id": movieId,
        // "showtime_detail.opening_date": {
        //   $gte: dateFormat,
        // },
        "delete_date": null,
      });
      return showtimes;
    } catch (error) {
      console.error("Lỗi khi lấy lịch chiếu theo bộ phim và ngày:", error);
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
