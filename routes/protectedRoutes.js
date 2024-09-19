const express = require('express');
const router = express.Router();
const requestHandler = require('../services/requestHandler');

// Protected routes (require token validation)
router.get('/user/:id', requestHandler);  // Get user details
router.post('/billing', requestHandler);  // Create billing info
router.put('/user/:id', requestHandler);  // Update user
router.delete('/billing/:id', requestHandler);  // Delete billing info

module.exports = router;
