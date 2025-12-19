const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const getRecipeIds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const recipes = await Recipe.find({}).select('_id title');
    
    console.log('Recipe IDs in database:');
    recipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ID: ${recipe._id} - Title: ${recipe.title}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

getRecipeIds();