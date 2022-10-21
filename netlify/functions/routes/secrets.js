const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secretController');

router.get('/secrets', secretsController.handleSecret)
      .post('/secrets', secretsController.handleSecret);

module.exports = router;