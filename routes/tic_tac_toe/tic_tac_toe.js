const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/tic_tac_toe/tic_tac_toeController")

router.get('/tic_tac_toe',verifyUser,controller.tic_tac_toeController);

module.exports = router;