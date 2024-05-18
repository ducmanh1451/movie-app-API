module.exports = (showtimeRepo) => ({
  // get all
  async getAllShowtimes(req, res) {
    try {
      const showtimes = await showtimeRepo.getAllShowtimes();
      res.status(200).json({ payload: showtimes });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // get showtimes by movie and date
  async getShowtimesByMovieAndDate(req, res) {
    try {
      const { movie_id, date } = req.params;
      // res.status(200).json({payload: {movie_id, date}})
      // return
      const showtimes = await showtimeRepo.getShowtimesByMovieAndDate(movie_id, date);
      res.status(200).json({ payload: showtimes });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // create
  async createShowtime(req, res) {
    try {
      const { cinema_id, cinema_name, room_id, room_name, showtime_detail } =
        req.body;
      const currentDateTime = new Date();
      const newShowtime = await showtimeRepo.addNewShowtime({
        cinema_id,
        cinema_name,
        room_id,
        room_name,
        showtime_detail,
        create_date: currentDateTime,
        update_date: null,
        delete_date: null,
      });
      res.status(200).json({ payload: newShowtime });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update showtime
  async updateShowtime(req, res) {
    try {
      const _id = req.params._id;
      const { showtime_detail } = req.body;
      const currentDateTime = new Date();
      await showtimeRepo.updateShowtime(_id, {
        showtime_detail,
        update_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // delete showtime
  async deleteShowtime(req, res) {
    try {
      const _id = req.params._id;
      const currentDateTime = new Date();
      await showtimeRepo.deleteShowtime(_id, {
        delete_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
