const router = require("express").Router();
const repository = require("../../../../repositories/movie.repository");
const controller = require("../controllers/movie.controller")(repository);

// routes
router.get("/", controller.getAllMovies);

module.exports = router;
