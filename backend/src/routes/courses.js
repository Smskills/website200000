
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validateCourse = require('../middleware/validateCourse');
const { protect } = require('../middleware/authMiddleware');

// All Course CMS routes are protected
router.use(protect);

router.get('/', courseController.getAllCourses);
router.post('/', validateCourse, courseController.createCourse);
router.put('/:id', validateCourse, courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
