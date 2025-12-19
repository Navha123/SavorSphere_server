const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const checkRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const recipes = await Recipe.find({}).populate('author', 'name').populate('category', 'name');
    
    console.log(`Found ${recipes.length} recipes in database:`);
    recipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.title} - ${recipe.category?.name || 'No category'} - by ${recipe.author?.name || 'Unknown'}`);
    });
    
    if (recipes.length === 0) {
      console.log('\nNo recipes found. You may need to run the seed script.');
      console.log('Run: node add10Recipes.js');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkRecipes();