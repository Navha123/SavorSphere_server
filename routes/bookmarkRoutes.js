const express = require('express');
const { addBookmark, removeBookmark, getUserBookmarks, checkBookmark } = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addBookmark);
router.delete('/:recipeId', protect, removeBookmark);
router.get('/', protect, getUserBookmarks);
router.get('/check/:recipeId', protect, checkBookmark);

module.exports = router;