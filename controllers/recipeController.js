const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      author: req.user._id
    });
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .populate('author', 'name username')
      .populate('category', 'name');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name username')
      .populate('category', 'name');
    
    if (recipe) {
      recipe.viewCount += 1;
      await recipe.save();
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (recipe && (recipe.author.toString() === req.user._id.toString() || req.user.role === 'admin')) {
      Object.assign(recipe, req.body);
      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (recipe && (recipe.author.toString() === req.user._id.toString() || req.user.role === 'admin')) {
      await Recipe.findByIdAndDelete(req.params.id);
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ message: 'Recipe not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipeId = req.params.id;
    const userId = req.user._id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user has already rated this recipe
    const existingRatingIndex = recipe.ratings.findIndex(r => r.user.toString() === userId.toString());

    if (existingRatingIndex >= 0) {
      // Update existing rating
      recipe.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      recipe.ratings.push({ user: userId, rating });
    }

    // Calculate new average rating
    const totalRating = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
    recipe.averageRating = totalRating / recipe.ratings.length;

    const updatedRecipe = await recipe.save();
    await updatedRecipe.populate('author', 'name username');
    await updatedRecipe.populate('category', 'name');

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const scaleRecipe = async (req, res) => {
  try {
    const { servings } = req.body;
    const recipeId = req.params.id;

    if (!servings || servings < 1) {
      return res.status(400).json({ message: 'Valid servings number required' });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const originalServings = recipe.servings || 4;
    const scaleFactor = servings / originalServings;

    // Scale ingredients
    const scaledIngredients = recipe.ingredients.map(ingredient => ({
      ...ingredient.toObject(),
      quantity: ingredient.quantity * scaleFactor
    }));

    // Scale nutrition
    const scaledNutrition = {
      calories: Math.round(recipe.nutrition.calories * scaleFactor),
      protein: Math.round(recipe.nutrition.protein * scaleFactor * 10) / 10,
      carbs: Math.round(recipe.nutrition.carbs * scaleFactor * 10) / 10,
      fat: Math.round(recipe.nutrition.fat * scaleFactor * 10) / 10,
      fiber: Math.round(recipe.nutrition.fiber * scaleFactor * 10) / 10,
      sugar: Math.round(recipe.nutrition.sugar * scaleFactor * 10) / 10
    };

    res.json({
      ...recipe.toObject(),
      servings: servings,
      ingredients: scaledIngredients,
      nutrition: scaledNutrition
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe, rateRecipe, scaleRecipe };