const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

const createMealPlan = async (req, res) => {
  try {
    const { title, startDate, endDate, meals } = req.body;
    const userId = req.user._id;

    const mealPlan = new MealPlan({
      user: userId,
      title,
      startDate,
      endDate,
      meals
    });

    const savedMealPlan = await mealPlan.save();
    await savedMealPlan.populate('meals.recipe', 'title cookingTime difficulty');

    res.status(201).json(savedMealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserMealPlans = async (req, res) => {
  try {
    const userId = req.user._id;
    const mealPlans = await MealPlan.find({ user: userId })
      .populate('meals.recipe', 'title cookingTime difficulty nutrition')
      .sort({ createdAt: -1 });

    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id)
      .populate('meals.recipe', 'title cookingTime difficulty ingredients nutrition servings');

    if (!mealPlan || mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan || mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    Object.assign(mealPlan, req.body);
    const updatedMealPlan = await mealPlan.save();
    await updatedMealPlan.populate('meals.recipe', 'title cookingTime difficulty');

    res.json(updatedMealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan || mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal plan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateShoppingList = async (req, res) => {
  try {
    const { mealPlanId } = req.params;
    const mealPlan = await MealPlan.findById(mealPlanId)
      .populate('meals.recipe', 'title ingredients servings');

    if (!mealPlan || mealPlan.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Consolidate ingredients from all recipes
    const ingredientMap = new Map();

    for (const meal of mealPlan.meals) {
      if (meal.recipe) {
        const recipe = meal.recipe;
        const multiplier = meal.servings / (recipe.servings || 1);

        for (const ingredient of recipe.ingredients) {
          const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
          const scaledQuantity = ingredient.quantity * multiplier;

          if (ingredientMap.has(key)) {
            ingredientMap.get(key).quantity += scaledQuantity;
          } else {
            ingredientMap.set(key, {
              ingredient: {
                name: ingredient.name,
                unit: ingredient.unit
              },
              quantity: scaledQuantity,
              category: categorizeIngredient(ingredient.name)
            });
          }
        }
      }
    }

    const shoppingListItems = Array.from(ingredientMap.values());

    res.json({
      title: `${mealPlan.title} - Shopping List`,
      items: shoppingListItems,
      generatedFrom: mealPlan.meals.map(meal => ({
        recipe: meal.recipe._id,
        servings: meal.servings
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to categorize ingredients
const categorizeIngredient = (name) => {
  const categories = {
    'Produce': ['apple', 'banana', 'orange', 'lettuce', 'tomato', 'onion', 'garlic', 'potato', 'carrot', 'broccoli', 'spinach'],
    'Dairy': ['milk', 'cheese', 'butter', 'yogurt', 'cream'],
    'Meat': ['chicken', 'beef', 'pork', 'fish', 'turkey', 'bacon'],
    'Bakery': ['bread', 'flour', 'sugar', 'rice', 'pasta', 'cereal'],
    'Pantry': ['oil', 'vinegar', 'salt', 'pepper', 'spices', 'canned', 'sauce']
  };

  const lowerName = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return 'Other';
};

module.exports = { createMealPlan, getUserMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan, generateShoppingList };