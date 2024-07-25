const router = require("express").Router();
const repository = require("../../../../repositories/user.repository");
const controller = require("../controllers/staff.controller")(repository);

// staff API
router.get("/", controller.getAllStaffs);
router.post("/", controller.createStaff);
router.put("/:_id", controller.updateStaff);
router.delete("/:_id", controller.deleteStaff);

module.exports = router;
