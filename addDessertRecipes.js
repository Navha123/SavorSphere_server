const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const addDessertRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const admin = await User.findOne({ role: 'admin' });
    const desserts = await Category.findOne({ name: 'Desserts' });

    const recipes = [
      {
        title: 'Rose Falooda',
        description: 'Traditional Indian dessert drink with rose syrup, vermicelli, and ice cream',
        ingredients: ['Rose syrup', 'Vermicelli', 'Basil seeds', 'Milk', 'Vanilla ice cream', 'Nuts'],
        steps: ['Soak basil seeds', 'Boil vermicelli', 'Layer rose syrup in glass', 'Add milk and vermicelli', 'Top with ice cream and nuts'],
        cookingTime: 20,
        difficulty: 'Medium',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400']
      },
      {
        title: 'Chocolate Pudding',
        description: 'Rich and creamy chocolate pudding',
        ingredients: ['Dark chocolate', 'Milk', 'Sugar', 'Cornstarch', 'Vanilla', 'Cream'],
        steps: ['Heat milk with sugar', 'Mix cornstarch with cocoa', 'Combine and cook until thick', 'Add chocolate and vanilla', 'Chill before serving'],
        cookingTime: 25,
        difficulty: 'Easy',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400']
      },
      {
        title: 'Vanilla Pudding',
        description: 'Classic smooth vanilla pudding',
        ingredients: ['Milk', 'Sugar', 'Cornstarch', 'Egg yolks', 'Vanilla extract', 'Butter'],
        steps: ['Heat milk in saucepan', 'Whisk egg yolks with sugar', 'Add cornstarch mixture', 'Cook until thick', 'Stir in vanilla and butter'],
        cookingTime: 20,
        difficulty: 'Easy',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400']
      }
    ];

    for (const recipe of recipes) {
      await Recipe.create(recipe);
      console.log(`Added: ${recipe.title}`);
    }
    
    console.log('Falooda and pudding recipes added successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

addDessertRecipes();