const router = require("express").Router();
const repository = require("../../../../repositories/movie.repository");
const controller = require("../controllers/movie.controller")(repository);

// routes
router.get("/", controller.getAllMovies);
router.post("/", controller.createMovie);
router.put("/:_id", controller.updateMovie);
router.delete("/:_id", controller.deleteMovie);

module.exports = router;
