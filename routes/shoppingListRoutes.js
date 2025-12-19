const express = require('express');
const { createShoppingList, getUserShoppingLists, getShoppingListById, updateShoppingList, deleteShoppingList, generateFromRecipes } = require('../controllers/shoppingListController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getUserShoppingLists)
  .post(protect, createShoppingList);

router.route('/:id')
  .get(protect, getShoppingListById)
  .put(protect, updateShoppingList)
  .delete(protect, deleteShoppingList);

router.post('/generate/from-recipes', protect, generateFromRecipes);

module.exports = router;