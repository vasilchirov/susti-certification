const express = require('express');
const router = express.Router();
const controller = require('../controllers/summaryController');

router.get('/:id', controller.getSummary);

module.exports = router;