const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");

router.get('/koko',verifyUser,function(req, res, next) {
  res.render('koko/koko'); // Assuming you have a template engine for rendering
});

module.exports = router;