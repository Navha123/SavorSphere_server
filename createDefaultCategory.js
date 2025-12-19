const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const createDefaultCategory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const defaultCategory = await Category.findOne({ name: 'General' });
    if (defaultCategory) {
      console.log('Default category already exists:', defaultCategory._id);
      return;
    }

    const category = await Category.create({
      name: 'General',
      description: 'General recipes'
    });

    console.log('Default category created:', category._id);
    
  } catch (error) {
    console.error('Error creating category:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createDefaultCategory();