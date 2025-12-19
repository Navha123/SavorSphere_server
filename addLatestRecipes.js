const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const addLatestRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const admin = await User.findOne({ role: 'admin' });
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const desserts = await Category.findOne({ name: 'Desserts' });

    const newRecipes = [
      {
        title: 'Chocolate Brownies',
        description: 'Rich, fudgy chocolate brownies with a crispy top',
        ingredients: ['Dark chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Cocoa powder'],
        steps: ['Melt chocolate and butter', 'Mix with sugar and eggs', 'Add flour and cocoa', 'Bake for 25 minutes'],
        cookingTime: 35,
        difficulty: 'Medium',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400']
      },
      {
        title: 'Margherita Pizza',
        description: 'Classic Italian pizza with tomato, mozzarella, and basil',
        ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil', 'Olive oil'],
        steps: ['Roll out dough', 'Spread tomato sauce', 'Add cheese and basil', 'Bake at 220°C for 12 minutes'],
        cookingTime: 20,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400']
      }
    ];

    for (const recipe of newRecipes) {
      await Recipe.create(recipe);
      console.log(`Added recipe: ${recipe.title}`);
    }
    
    console.log('Latest recipes added successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

addLatestRecipes();