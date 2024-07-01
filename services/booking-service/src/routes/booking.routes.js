const router = require("express").Router();
const repository = require("../../../../repositories/booking.repository");
const controller = require("../controllers/booking.controller")(repository);
const verifyToken = require("../../../../middlewares/auth-customer.middleware");

// routes
router.get("/", controller.getAllBookings);
router.post("/create", controller.createBooking);
router.post("/delete", controller.deleteBooking);

// sub routes
router.get("/search", verifyToken, controller.searchBooking);
router.get("/find/:_id", verifyToken, controller.findBooking);
router.post("/update-seats-status", verifyToken, controller.updateSeatsStatus);

module.exports = router;
