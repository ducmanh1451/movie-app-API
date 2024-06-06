const router = require("express").Router();
const repository = require("../../../../repositories/auth.repository");
const controller = require("../controllers/auth-customer.controller")(repository);

// routes
router.post("/register", controller.registerCustomer);

module.exports = router;
