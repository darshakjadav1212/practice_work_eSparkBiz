const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");

router.get('/dynamic', verifyUser,function(req, res, next) {
  res.render('dynamic_table/dynamic_table'); // Assuming you have a template engine for rendering
});

module.exports = router;