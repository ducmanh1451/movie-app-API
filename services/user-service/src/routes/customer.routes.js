const router = require("express").Router();
const repository = require("../../../../repositories/user.repository");
const controller = require("../controllers/customer.controller")(repository);
const verifyToken = require("../../../../middlewares/auth-customer.middleware");

// customer API
router.get("/customer/:_id", verifyToken, controller.findCustomer);
router.put("/customer/:_id", verifyToken, controller.updateCustomer);

module.exports = router;
