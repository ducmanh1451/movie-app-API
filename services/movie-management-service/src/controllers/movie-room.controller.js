module.exports = (movieRoomRepo) => ({
  // get all movies
  async getAllMovieRooms(req, res) {
    try {
      const movieRooms = await movieRoomRepo.getAllMovieRooms();
      res.status(200).json({ payload: movieRooms });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  // find by id
  async findMovieRoom(req, res) {
    try {
      const _id = req.params._id;
      const movieRoom = await movieRoomRepo.findMovieRoom(_id);
      res.status(200).json({ payload: movieRoom });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  // create
  async createMovieRoom(req, res) {
    try {
      const { cinema_id, cinema_name, room_name, rows, columns, seats } =
        req.body;
      const currentDateTime = new Date();
      const newMovieRoom = await movieRoomRepo.addNewMovieRoom({
        cinema_id,
        cinema_name,
        room_name,
        rows,
        columns,
        seats,
        create_date: currentDateTime,
        update_date: null,
        delete_date: null,
      });
      res.status(200).json({ payload: newMovieRoom });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update
  async updateMovieRoom(req, res) {
    try {
      const _id = req.params._id;
      const { room_name, seats } = req.body;
      const currentDateTime = new Date();
      await movieRoomRepo.updateMovieRoom(_id, {
        room_name,
        seats,
        update_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // delete
  async deleteMovieRoom(req, res) {
    try {
      const _id = req.params._id;
      const currentDateTime = new Date();
      await movieRoomRepo.deleteMovieRoom(_id, {
        delete_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // get movie rooms by cinema_id
  async getMovieRoomsByCinemaId(req, res) {
    try {
      const cinema_id = req.params.cinema_id;
      const movieRooms = await movieRoomRepo.getMovieRoomsByCinemaId(cinema_id);
      res.status(200).json({ payload: movieRooms });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
