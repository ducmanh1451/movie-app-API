const express = require("express");

const movieRoutes = require("./movie.routes");

const router = express.Router();

router.use("/movie/", movieRoutes);

module.exports = router;
