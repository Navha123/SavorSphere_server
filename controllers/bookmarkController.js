const Bookmark = require('../models/Bookmark');

const addBookmark = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user._id;

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({ user: userId, recipe: recipeId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Recipe already bookmarked' });
    }

    const bookmark = new Bookmark({
      user: userId,
      recipe: recipeId
    });

    await bookmark.save();
    res.status(201).json({ message: 'Recipe bookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    const bookmark = await Bookmark.findOneAndDelete({ user: userId, recipe: recipeId });
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ user: userId })
      .populate({
        path: 'recipe',
        populate: [
          { path: 'author', select: 'name username' },
          { path: 'category', select: 'name' }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkBookmark = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    const bookmark = await Bookmark.findOne({ user: userId, recipe: recipeId });
    res.json({ isBookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBookmark, removeBookmark, getUserBookmarks, checkBookmark };