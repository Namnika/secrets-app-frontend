const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secretsController');

router.get('/secrets', secretsController.handleSecret);
router.post('/secrets', secretsController.handleSecret);

module.exports = router;