const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const addDefaultImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const defaultImages = {
      'paneer': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
      'rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
      'chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      'tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
    };

    const updates = [
      { title: 'Classic Paneer Butter Masala', image: defaultImages.paneer },
      { title: 'Vegetable Fried Rice', image: defaultImages.rice },
      { title: 'Chicken Curry', image: defaultImages.chicken },
      { title: 'Classic Lemon Iced Tea', image: defaultImages.tea }
    ];

    for (const update of updates) {
      await Recipe.updateOne(
        { title: { $regex: update.title, $options: 'i' } },
        { $set: { images: [update.image] } }
      );
      console.log(`Updated ${update.title} with image`);
    }
    
    console.log('All recipes updated with images!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

addDefaultImages();