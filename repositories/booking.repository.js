const Booking = require("./../models/booking");
const mongoose = require("mongoose");

module.exports = {
  // get all bookings
  async getAllBookings() {
    return Booking.find({ delete_date: null });
  },

  // create
  async addNewBooking(bookings) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const bookingDocuments = bookings.map((booking) => {
        return {
          cinema_id: booking.cinema_id,
          cinema_name: booking.cinema_name,
          room_id: booking.room_id,
          room_name: booking.room_name,
          movie_id: booking.movie_id,
          movie_name: booking.movie_name,
          expected_start_date: booking.expected_start_date,
          expected_end_date: booking.expected_end_date,
          opening_date: booking.opening_date,
          opening_start_time: booking.opening_start_time,
          opening_end_time: booking.opening_end_time,
          opening_start_time: booking.opening_start_time,
          seats: booking.seats,
          rows: booking.rows,
          columns: booking.columns,
          create_date: new Date(),
          update_date: null,
          delete_date: null,
        };
      });
      return await Booking.insertMany(bookingDocuments);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete
  async deleteBooking(params) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Booking.updateMany(
        {
          cinema_id: params.cinema_id,
          room_id: params.room_id,
          opening_date: params.opening_date,
          delete_date: null,
        },
        { $set: { delete_date: new Date() } },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // search
  async searchBookings(movieId, date) {
    return Booking.aggregate([
      {
        $match: {
          movie_id: movieId,
          opening_date: new Date(date),
          delete_date: null,
        },
      },
      {
        $group: {
          _id: {
            cinema_id: "$cinema_id",
            cinema_name: "$cinema_name",
            room_id: "$room_id",
            room_name: "$room_name",
            opening_date: "$opening_date",
          },
          opening_start_times: {
            $push: {
              opening_start_time: "$opening_start_time",
              booking_id: "$_id",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          cinema_id: "$_id.cinema_id",
          cinema_name: "$_id.cinema_name",
          room_id: "$_id.room_id",
          room_name: "$_id.room_name",
          opening_date: "$_id.opening_date",
          times: "$opening_start_times",
        },
      },
    ]);
  },

  // find booking by id
  async findBooking(bookingId) {
    return Booking.find({ _id: bookingId, delete_date: null });
  },
};
