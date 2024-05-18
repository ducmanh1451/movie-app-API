const router = require("express").Router();
const repository = require("../../../../repositories/showtime.repository");
const controller = require("../controllers/showtime.controller")(repository);

// routes
router.get("/", controller.getAllShowtimes);
router.post("/", controller.createShowtime);
router.put("/:_id", controller.updateShowtime);
router.delete("/:_id", controller.deleteShowtime);

// sub routes
router.get("/by-movie/:movie_id/by-date/:date", controller.getShowtimesByMovieAndDate);

module.exports = router;
