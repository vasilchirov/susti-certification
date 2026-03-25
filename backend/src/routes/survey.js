const express = require('express');
const router = express.Router();
const controller = require('../controllers/surveyController');

router.get('/', controller.getQuestions);
router.post('/', controller.postSurvey);

module.exports = router;