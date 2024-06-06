const express = require("express");

const authCustomerRoutes = require("./auth-customer.routes");

const router = express.Router();

router.use("/auth-customer/", authCustomerRoutes);

module.exports = router;
