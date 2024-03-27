const express = require('express');
const router = express.Router();

router.get('/dynamic', function(req, res, next) {
  res.render('dynamic_table/dynamic_table'); // Assuming you have a template engine for rendering
});

module.exports = router;