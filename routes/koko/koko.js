const express = require('express');
const router = express.Router();

router.get('/koko', function(req, res, next) {
  res.render('koko/koko'); // Assuming you have a template engine for rendering
});

module.exports = router;