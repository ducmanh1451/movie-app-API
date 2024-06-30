const router = require("express").Router();
const repository = require("../../../../repositories/auth.repository");
const controller = require("../controllers/auth-customer.controller")(repository);
const verifyToken = require("../../../../middlewares/auth-customer.middleware");

// routes
router.get("/:id", verifyToken, controller.findCustomer);

router.post("/register", controller.registerCustomer);
router.post("/login", controller.loginCustomer);
router.post("/refresh-access-token", controller.refreshCustomerAccessToken);
router.post("/logout", controller.logoutCustomer);
// router.post("/verify-access-token", controller.verifyCustomerAccessToken);

module.exports = router;
