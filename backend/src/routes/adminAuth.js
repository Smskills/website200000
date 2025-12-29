
const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminAuthController');
const { loginLimiter } = require('../middleware/rateLimiter');

// Public login endpoint with rate limiting
router.post('/login', loginLimiter, authController.login);

module.exports = router;
