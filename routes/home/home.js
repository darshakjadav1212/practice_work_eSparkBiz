const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/authentication");

router.get("/home", verifyUser, function (req, res) {
  res.render("home/home"); // Assuming you have a template engine for rendering
});

module.exports = router;
