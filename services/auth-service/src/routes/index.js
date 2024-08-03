const express = require("express");

const authCustomerRoutes = require("./auth-customer.routes");
const authStaffRoutes = require("./auth-staff.routes");

const router = express.Router();

router.use("/auth-customer/", authCustomerRoutes);
router.use("/auth-staff/", authStaffRoutes);

module.exports = router;
