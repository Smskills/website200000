
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const noticeController = require('../controllers/noticeController');

// READ-ONLY PUBLIC ENDPOINTS
router.get('/courses', courseController.getPublicCourses);
router.get('/notices', noticeController.getPublicNotices);

module.exports = router;
