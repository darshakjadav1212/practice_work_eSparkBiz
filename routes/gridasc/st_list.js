const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/gridasc/girdascController");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/gridasc',verifyUser, controller.getGridAscController);

module.exports = router;