const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const fixRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    // Clear existing recipes
    await Recipe.deleteMany({});
    
    // Get admin user and categories
    const admin = await User.findOne({ role: 'admin' });
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const nonVeg = await Category.findOne({ name: 'Non-Vegetarian' });
    const desserts = await Category.findOne({ name: 'Desserts' });
    const beverages = await Category.findOne({ name: 'Beverages' });

    const recipes = [
      {
        title: 'Butter Chicken',
        description: 'Creamy tomato-based chicken curry',
        ingredients: ['500g chicken', '2 tbsp butter', '1 cup tomatoes', '1/2 cup cream', 'Spices'],
        steps: ['Marinate chicken', 'Cook in butter', 'Add tomato gravy', 'Simmer with cream'],
        cookingTime: 45,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400']
      },
      {
        title: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
        steps: ['Wash lettuce', 'Add dressing', 'Top with cheese and croutons'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400']
      },
      {
        title: 'Chocolate Cake',
        description: 'Moist chocolate layer cake',
        ingredients: ['2 cups flour', '1 cup cocoa', '2 cups sugar', '3 eggs', '1 cup butter'],
        steps: ['Mix dry ingredients', 'Add wet ingredients', 'Bake layers', 'Assemble with frosting'],
        cookingTime: 60,
        difficulty: 'Hard',
        category: desserts._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400']
      }
    ];

    for (const recipe of recipes) {
      await Recipe.create(recipe);
      console.log(`Added: ${recipe.title}`);
    }
    
    console.log('Recipes fixed successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixRecipes();