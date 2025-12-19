const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const Category = require('./models/Category');
require('dotenv').config();

const assignCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const nonVeg = await Category.findOne({ name: 'Non-Vegetarian' });
    const beverages = await Category.findOne({ name: 'Beverages' });

    const updates = [
      { title: 'Classic Paneer Butter Masala', category: vegetarian._id },
      { title: 'Vegetable Fried Rice', category: vegetarian._id },
      { title: 'Chicken Curry', category: nonVeg._id },
      { title: 'Classic Lemon Iced Tea', category: beverages._id }
    ];

    for (const update of updates) {
      await Recipe.updateOne(
        { title: { $regex: update.title, $options: 'i' } },
        { $set: { category: update.category } }
      );
      console.log(`Updated ${update.title} with category`);
    }
    
    console.log('All recipes updated with categories!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

assignCategories();