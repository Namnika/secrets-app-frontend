const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secretsController');

router.post('/', secretsController.handleSecret);

module.exports = router;