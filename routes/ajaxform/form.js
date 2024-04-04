const express = require('express');
const router = express.Router();

const verifyUser = require("../../middleware/authentication");
const controller = require("../../controllers/ajaxform/ajaxformController");
const con = require('../../db');

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/ajaxform',verifyUser, controller.getAjaxFormController);

router.post('/basic_details',controller.postBasicDetailsController);

router.post('/education_details', controller.postEducationDetailsController);

router.post('/work_experience',  controller.postWorkExperienceController);

router.post('/language', controller.postLanguageController);

router.post('/technology', controller.postTechnologyController);

router.post('/references', controller.postReferenceController);

router.post('/preferences', controller.postPreferenceController);

module.exports = router;