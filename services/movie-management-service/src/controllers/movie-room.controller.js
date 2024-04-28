module.exports = (movieRoomRepo) => ({
  // create
  async createMovieRoom(req, res) {
    try {
      const { cinema_id, room_name, rows, columns, seats } = req.body;
      const currentDateTime = new Date();
      const newMovieRoom = await movieRoomRepo.addNewMovieRoom({
        cinema_id,
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
});
