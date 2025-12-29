
const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const validateEnquiry = require('../middleware/validateEnquiry');
const { enquiryLimiter } = require('../middleware/rateLimiter');

// POST /api/enquiry
// Middleware Flow: Rate Limit -> Validation/Sanitization -> Controller
router.post('/', enquiryLimiter, validateEnquiry, enquiryController.submitEnquiry);

module.exports = router;
