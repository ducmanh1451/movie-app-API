const router = require("express").Router();
const repository = require("../../../../repositories/booking.repository");
const controller = require("../controllers/booking.controller")(repository);

// routes
router.get("/", controller.getAllBookings);
router.post("/create", controller.createBooking);
router.post("/delete", controller.deleteBooking);

// sub routes
router.get("/search", controller.searchBooking);
router.get("/find/:_id", controller.findBooking);


module.exports = router;
