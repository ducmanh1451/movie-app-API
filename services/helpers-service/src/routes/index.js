const express = require("express");
const repository = require("../../../../repositories/helper.repository");
const controller = require("../controllers/helper.controller")(repository);

// const movieRoutes = require("./movie.routes");

const router = express.Router();

router.use("/get-libraries/:lib_cd", controller.getLibraryByCode);

module.exports = router;
