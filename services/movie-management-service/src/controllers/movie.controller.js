module.exports = (movieRepo) => ({
  // get all movies
  async getAllMovies(req, res) {
    try {
      const movies = await movieRepo.getAllMovies();
      res.status(200).json({ payload: movies });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
