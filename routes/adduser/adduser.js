const express = require('express');
const router = express.Router();
const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/adduser/addUserController")

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));


router.get('/adduser',verifyUser,controller.getAddUserController); 

router.post('/get_details',verifyUser, controller.postGetDetailsController); 

router.get('/viewall/:id',verifyUser, controller.getViewDetailsController); 

module.exports = router;