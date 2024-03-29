const express = require("express");
const router = express.Router();

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/"); // Assuming you have a template engine for rendering
});

module.exports = router;
