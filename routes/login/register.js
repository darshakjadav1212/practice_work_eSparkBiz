const express = require('express');
const router = express.Router();
const controller = require("../../controllers/login/loginController")

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', controller.getLoginController );
router.post('/login', controller.postLoginController);
router.get('/signup', controller.getSignUpController);
router.get('/activate', controller.getActivateController);
router.post('/register', controller.postSignUpController);

module.exports = router;