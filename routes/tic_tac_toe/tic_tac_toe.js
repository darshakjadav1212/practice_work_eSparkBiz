const express = require('express');
const router = express.Router();

router.get('/tic_tac_toe', function(req, res, next) {
  res.render('tic_tac_toe/tic_tac_toe'); // Assuming you have a template engine for rendering
});

module.exports = router;