const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");

router.get('/tic_tac_toe',verifyUser,function(req, res, next) {
  res.render('tic_tac_toe/tic_tac_toe'); // Assuming you have a template engine for rendering
});

module.exports = router;