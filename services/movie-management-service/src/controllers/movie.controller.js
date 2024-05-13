const { formatDate } = require("../../../../common/common");

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

  // get showing movies
  async getShowingMovies(req, res) {
    try {
      const showingMovies = await movieRepo.getShowingMovies();
      res.status(200).json({ payload: showingMovies });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // get upcoming movies
  async getUpcomingMovies(req, res) {
    try {
      const upcomingMovies = await movieRepo.getUpcomingMovies();
      res.status(200).json({ payload: upcomingMovies });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // create movie
  async createMovie(req, res) {
    try {
      const {
        movie_name,
        genre,
        director,
        actors,
        rating,
        movie_type,
        expected_start_date,
        expected_end_date,
        movie_duration,
        content,
        poster,
      } = req.body;
      const currentDateTime = new Date();
      
      // Thực hiện thêm bản ghi mới vào danh sách phim
      const newMovie = await movieRepo.addNewMovie({
        movie_name,
        genre,
        director,
        actors,
        rating,
        movie_type,
        expected_start_date,
        expected_end_date,
        movie_duration,
        content,
        poster,
        create_date: currentDateTime,
        update_date: null,
        delete_date: null,
      });
      res.status(200).json({ payload: newMovie });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update movie
  async updateMovie(req, res) {
    try {
      const _id = req.params._id;
      const {
        movie_name,
        genre,
        director,
        actors,
        rating,
        movie_type,
        movie_duration,
        expected_start_date,
        expected_end_date,
        content,
        poster,
      } = req.body;

      const currentDateTime = new Date();
      await movieRepo.updateMovie(_id, {
        movie_name,
        genre,
        director,
        actors,
        rating,
        movie_type,
        expected_start_date,
        expected_end_date,
        movie_duration,
        content,
        poster,
        update_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // delete movie
  async deleteMovie(req, res) {
    try {
      const _id = req.params._id;
      const currentDateTime = new Date();
      await movieRepo.deleteMovie(_id, {
        delete_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
