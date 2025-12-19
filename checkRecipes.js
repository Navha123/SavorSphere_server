const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const checkRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const recipes = await Recipe.find({});
    console.log(`Found ${recipes.length} recipes in database`);
    
    if (recipes.length === 0) {
      console.log('No recipes found. Database is empty.');
    } else {
      recipes.forEach(r => console.log(`- ${r.title}`));
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkRecipes();