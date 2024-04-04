const express = require("express");
const router = express.Router();

const verifyUser = require("../../middleware/authentication");
const controller = require ("../../controllers/gridsearch/gridSearchController");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



router.get("/gridsearch",verifyUser,controller.getGridSearchController );
router.get("/search",verifyUser,controller.getSearchController);
router.get("/hide",verifyUser,controller.getHideController);

module.exports = router;
