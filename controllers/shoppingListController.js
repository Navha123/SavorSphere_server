const ShoppingList = require('../models/ShoppingList');
const Recipe = require('../models/Recipe');

const createShoppingList = async (req, res) => {
  try {
    const { title, items, generatedFrom } = req.body;
    const userId = req.user._id;

    const shoppingList = new ShoppingList({
      user: userId,
      title,
      items,
      generatedFrom: generatedFrom || []
    });

    const savedList = await shoppingList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserShoppingLists = async (req, res) => {
  try {
    const userId = req.user._id;
    const shoppingLists = await ShoppingList.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShoppingListById = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList || shoppingList.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList || shoppingList.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    Object.assign(shoppingList, req.body);
    const updatedList = await shoppingList.save();

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList || shoppingList.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    await ShoppingList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shopping list deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateFromRecipes = async (req, res) => {
  try {
    const { recipes } = req.body; // Array of { recipeId, servings }
    const userId = req.user._id;

    // Consolidate ingredients from selected recipes
    const ingredientMap = new Map();

    for (const recipeData of recipes) {
      const recipe = await Recipe.findById(recipeData.recipeId);
      if (recipe) {
        const multiplier = recipeData.servings / (recipe.servings || 1);

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

    const shoppingList = new ShoppingList({
      user: userId,
      title: `Shopping List - ${new Date().toLocaleDateString()}`,
      items: shoppingListItems,
      generatedFrom: recipes
    });

    const savedList = await shoppingList.save();
    res.status(201).json(savedList);
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

module.exports = { createShoppingList, getUserShoppingLists, getShoppingListById, updateShoppingList, deleteShoppingList, generateFromRecipes };