const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const createCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const categories = [
      { name: 'Vegetarian', description: 'Vegetarian recipes' },
      { name: 'Non-Vegetarian', description: 'Non-vegetarian recipes' },
      { name: 'Desserts', description: 'Sweet desserts and treats' },
      { name: 'Beverages', description: 'Drinks and beverages' },
      { name: 'Appetizers', description: 'Starters and appetizers' },
      { name: 'Main Course', description: 'Main course dishes' }
    ];

    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      }
    }
    
    console.log('All categories ready!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createCategories();