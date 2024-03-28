const express = require("express");
const router = express.Router();
const verifyUser = require("../../middleware/authentication");

router.get("/event",verifyUser, function (req, res, next) {
  res.render("eventHandle/event"); // Assuming you have a template engine for rendering
});

module.exports = router;
