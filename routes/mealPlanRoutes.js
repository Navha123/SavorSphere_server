const express = require('express');
const { createMealPlan, getUserMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan, generateShoppingList } = require('../controllers/mealPlanController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getUserMealPlans)
  .post(protect, createMealPlan);

router.route('/:id')
  .get(protect, getMealPlanById)
  .put(protect, updateMealPlan)
  .delete(protect, deleteMealPlan);

router.get('/:id/shopping-list', protect, generateShoppingList);

module.exports = router;