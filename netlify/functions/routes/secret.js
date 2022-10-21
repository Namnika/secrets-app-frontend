const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secretController');

router.get('/', secretsController.handleSecret)
      .post('/', secretsController.handleSecret);

module.exports = router;