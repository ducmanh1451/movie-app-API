const express = require("express");

const customerRoutes = require("./customer.routes");
const staffRoutes = require("./staff.routes");

const router = express.Router();

router.use("/user/", customerRoutes);
router.use("/staff/", staffRoutes);

module.exports = router;
