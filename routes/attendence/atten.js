const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/attendence/attendenceController")

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/atten',verifyUser, controller.getAttendenceController);

module.exports = router;