const express = require('express');
const router = express.Router();
const controller = require('../controllers/lblController');

router.get('/', controller.getAllLabels);

module.exports = router;