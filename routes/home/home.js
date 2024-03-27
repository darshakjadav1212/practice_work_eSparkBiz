const express = require('express');
const router = express.Router();

router.get('/home', function(req, res, next) {
  res.render('home/home'); // Assuming you have a template engine for rendering
});

module.exports = router;