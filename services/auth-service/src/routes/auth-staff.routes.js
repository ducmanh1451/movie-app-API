const router = require("express").Router();
const repository = require("../../../../repositories/auth.repository");
const controller = require("../controllers/auth-staff.controller")(repository);

// staff authentication API
router.post("/login", controller.loginStaff);
router.post("/refresh-access-token", controller.refreshStaffAccessToken);

module.exports = router;
