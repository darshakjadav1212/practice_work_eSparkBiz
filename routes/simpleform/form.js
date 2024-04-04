const express = require('express');

const router = express.Router();

const verifyUser = require("../../middleware/authentication");
const controller =  require("../../controllers/simpleform/simpleformController");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/simpleform',verifyUser, controller.getSimpeFormController);

router.post('/create',verifyUser, controller.postSimpeFormController);

router.get('/update/:id',verifyUser, controller.getUpdateController);
  
router.post('/finalupdate',verifyUser, controller.postUpdateController);
module.exports = router;