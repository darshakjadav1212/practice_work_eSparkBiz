const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/koko/kokoController")

router.get('/koko',verifyUser,controller.kokoController);

module.exports = router;