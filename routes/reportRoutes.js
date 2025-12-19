const express = require('express');
const { generateUserReport, getReports, getSystemStats } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/generate', protect, generateUserReport);
router.get('/', protect, getReports);
router.get('/system', protect, getSystemStats);

module.exports = router;