const express = require("express");

const movieRoutes = require("./movie.routes");
const cinemaRoutes = require("./cinema.routes");

const router = express.Router();

router.use("/movie/", movieRoutes);
router.use("/cinema/", cinemaRoutes);

module.exports = router;
