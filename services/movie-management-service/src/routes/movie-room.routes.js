const router = require("express").Router();
const repository = require("../../../../repositories/movie-room.repository");
const controller = require("../controllers/movie-room.controller")(repository);

// routes
// router.get("/", controller.createMovieRoom);
router.post("/", controller.createMovieRoom);
// router.put("/:_id", controller.updateCinema);
// router.delete("/:_id", controller.deleteCinema);

module.exports = router;
