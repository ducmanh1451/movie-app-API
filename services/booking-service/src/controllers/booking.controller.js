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

  // search
  async searchBooking(req, res) {
    try {
      const { movieId, date } = req.query;
      const bookings = await bookingRepo.searchBookings(movieId, date);
      res.status(200).json({ bookings: bookings });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // find
  async findBooking(req, res) {
    try {
      const booking = await bookingRepo.findBooking(req.params._id);
      res.status(200).json({ booking: booking });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update seats status
  async updateSeatsStatus(req, res) {
    try {
      const bookingId = req.body.booking_id;
      const seats = req.body.seats;
      const customer = req.body.customer;
      await bookingRepo.updateSeatsStatus(bookingId, seats, customer);
      const booking = await bookingRepo.findBooking(bookingId);
      res.status(200).json({ payload: booking });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
