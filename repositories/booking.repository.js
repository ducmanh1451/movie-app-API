const Booking = require("./../models/booking");
const mongoose = require("mongoose");

module.exports = {
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
};
