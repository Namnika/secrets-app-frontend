const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secretsController');

router.get('/', secretsController.handleSecret);
router.post('/', secretsController.handleSecret);

module.exports = router;