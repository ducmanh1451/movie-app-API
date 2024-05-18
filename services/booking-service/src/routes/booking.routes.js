const router = require("express").Router();
const repository = require("../../../../repositories/booking.repository");
const controller = require("../controllers/booking.controller")(repository);

// routes
// router.get("/", controller.getAllCinemas);
// router.post("/", controller.createCinema);
// router.put("/:_id", controller.updateCinema);
// router.delete("/:_id", controller.deleteCinema);

module.exports = router;
