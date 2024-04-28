const express = require("express");

const movieRoutes = require("./movie.routes");
const cinemaRoutes = require("./cinema.routes");
const movieRoomRoutes = require("./movie-room.routes");

const router = express.Router();

router.use("/movie/", movieRoutes);
router.use("/cinema/", cinemaRoutes);
router.use("/movie-room/", movieRoomRoutes);

module.exports = router;
