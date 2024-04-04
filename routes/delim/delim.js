const express = require("express");
const router = express.Router();

const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/delim/delimController");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



router.get("/delim",verifyUser,controller.getDelimController);

router.get("/delim1",verifyUser, controller.getDelim1Conroller);
  

module.exports = router;
