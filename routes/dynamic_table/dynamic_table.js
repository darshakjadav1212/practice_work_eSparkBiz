const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/dynamic_table/dynamic_tableController")

router.get('/dynamic', verifyUser,controller.dynamicTableController);

module.exports = router;