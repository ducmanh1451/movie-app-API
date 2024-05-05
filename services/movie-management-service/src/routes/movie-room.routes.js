const router = require("express").Router();
const repository = require("../../../../repositories/movie-room.repository");
const controller = require("../controllers/movie-room.controller")(repository);

// main routes
router.get("/", controller.getAllMovieRooms);
router.get("/:_id", controller.findMovieRoom);
router.post("/", controller.createMovieRoom);
router.put("/:_id", controller.updateMovieRoom);
router.delete("/:_id", controller.deleteMovieRoom);

// sub routes
router.get("/by-cinema/:cinema_id", controller.getMovieRoomsByCinemaId);

module.exports = router;
