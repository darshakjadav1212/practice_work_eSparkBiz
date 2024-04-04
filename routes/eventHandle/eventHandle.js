const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/eventHandle/eventHandleController")

router.get("/event",verifyUser, controller.eventHandleController);

module.exports = router;
