const express = require('express');
const router = express.Router();
const requestHandler = require('../services/requestHandler');

// Public routes (e.g., login, signup, change password)
router.post('/login', requestHandler);
router.post('/signup', requestHandler);
router.post('/changePassword', requestHandler);

module.exports = router;
