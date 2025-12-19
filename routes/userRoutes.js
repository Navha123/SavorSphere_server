const express = require('express');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, admin, getAllUsers);

module.exports = router;