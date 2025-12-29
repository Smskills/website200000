
const rateLimit = require('express-rate-limit');

/**
 * Enquiry Rate Limiter
 */
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: { status: 'error', message: 'Too many enquiries. Please wait.' }
});

/**
 * Brute Force Protection for Login
 */
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 failed login attempts per hour
  message: { 
    status: 'error', 
    message: 'Too many failed login attempts. Identity verification locked for 1 hour.' 
  },
  skipSuccessfulRequests: true
});

module.exports = { enquiryLimiter, loginLimiter };
