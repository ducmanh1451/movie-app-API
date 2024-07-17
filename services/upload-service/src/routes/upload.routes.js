const router = require("express").Router();
const controller = require("../controllers/upload.controller")();

// routes
router.get("/images", controller.getImages);
router.post("/images", controller.uploadImages);
router.delete("/images", controller.deleteImages);

module.exports = router;
