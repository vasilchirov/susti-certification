const express = require('express');
const router = express.Router();
const controller = require('../controllers/certController');

router.get('/', controller.getAllCertificates);
router.get('/:id', controller.getCerificate);
router.post('/', controller.addCertificate);

module.exports = router;