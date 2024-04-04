const express = require('express');
const router = express.Router();

const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/gridfetch/gridfetchController")

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



router.get('/gridfetch',verifyUser, controller.getFetchController);

router.all('/data',verifyUser,controller.allDataController);


module.exports = router;