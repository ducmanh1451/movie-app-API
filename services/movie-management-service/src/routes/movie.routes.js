const router = require("express").Router();
const repository = require("../../../../repositories/movie.repository");
const controller = require("../controllers/movie.controller")(repository);

// routes
router.get("/", controller.getAllMovies);
router.post("/", controller.createMovie);
router.put("/:_id", controller.updateMovie);
router.delete("/:_id", controller.deleteMovie);

// sub routes
router.get("/get-showing-movie", controller.getShowingMovies);
router.get("/get-upcoming-movie", controller.getUpcomingMovies);

module.exports = router;
