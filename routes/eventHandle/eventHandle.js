const express = require('express');
const router = express.Router();

router.get('/event', function(req, res, next) {
  res.render('eventHandle/event'); // Assuming you have a template engine for rendering
});

module.exports = router;