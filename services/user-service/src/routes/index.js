const express = require("express");

const customerRoutes = require("./customer.routes");

const router = express.Router();

router.use("/user/", customerRoutes);

module.exports = router;
