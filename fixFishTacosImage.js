const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const fixFishTacosImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    await Recipe.updateOne(
      { title: 'Fish Tacos' },
      { $set: { images: ['https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400'] } }
    );
    
    console.log('Fish Tacos image fixed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixFishTacosImage();