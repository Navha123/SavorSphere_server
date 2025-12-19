const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const imageUpdates = [
      { title: 'Classic Paneer Butter Masala', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
      { title: 'Vegetable Fried Rice', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
      { title: 'Chicken Curry', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
      { title: 'Classic Lemon Iced Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
      { title: 'Chocolate Brownies', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400' },
      { title: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400' },
      { title: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400' },
      { title: 'Caesar Salad', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' },
      { title: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
      { title: 'Mango Smoothie', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400' }
    ];

    for (const update of imageUpdates) {
      await Recipe.updateOne(
        { title: update.title },
        { $set: { images: [update.image] } }
      );
      console.log(`Updated image for: ${update.title}`);
    }
    
    console.log('All recipe images updated successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

updateImages();