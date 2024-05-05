const cron = require("node-cron");
const Movie = require("../../../models/movie");

const updateMovieTypeCron = () => {
  // Tạo cron job để log ra 123 mỗi 3 giây
  cron.schedule("0 1 * * *", async () => {
    try {
      // Lấy ngày hiện tại
      const currentDate = new Date();
      // Lấy danh sách các bản ghi trong collection movies có expected_start_date bằng với ngày hiện tại
      const moviesToUpdate = await Movie.find({
        expected_start_date: { $lte: currentDate },
        movie_type: 0,
        delete_date: null,
      });
      // Cập nhật movie_type = 1 cho các bản ghi tìm được
      await Promise.all(
        moviesToUpdate.map(async (movie) => {
          movie.movie_type = 1;
          movie.update_date = currentDate;
          await movie.save();
        })
      );
    } catch (error) {
      console.error("Error executing cron job:", error);
    }
  });
};

module.exports = {
  updateMovieTypeCron: updateMovieTypeCron,
};
