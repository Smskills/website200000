
const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const validateNotice = require('../middleware/validateNotice');
const { protect } = require('../middleware/authMiddleware');

// All Notice CMS routes are protected
router.use(protect);

router.get('/', noticeController.getAllNotices);
router.post('/', validateNotice, noticeController.createNotice);
router.put('/:id', validateNotice, noticeController.updateNotice);
router.patch('/:id/status', noticeController.toggleStatus);

module.exports = router;
