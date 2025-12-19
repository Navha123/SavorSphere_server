const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const checkIngredients = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const recipe = await Recipe.findById('6939442108aa07f407a21b6b');
    
    console.log('Recipe ingredients format:');
    console.log(JSON.stringify(recipe.ingredients, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkIngredients();