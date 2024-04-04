const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/home/homeController");

router.get("/home", verifyUser,controller.homeController);

module.exports = router;
