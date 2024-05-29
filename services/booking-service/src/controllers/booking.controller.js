module.exports = (bookingRepo) => ({
  // get all
  async getAllBookings(req, res) {
    try {
      const bookings = await bookingRepo.getAllBookings();
      res.status(200).json({ payload: bookings });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // create
  async createBooking(req, res) {
    try {
      const bookings = await bookingRepo.addNewBooking(req.body);
      res.status(200).json({ payload: bookings });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // delete
  async deleteBooking(req, res) {
    try {
      const { cinema_id, room_id, opening_date } = req.body;
      await bookingRepo.deleteBooking({
        cinema_id,
        room_id,
        opening_date,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
