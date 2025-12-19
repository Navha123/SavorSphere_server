const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const fixTiramisuImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    await Recipe.updateOne(
      { title: 'Tiramisu' },
      { $set: { images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'] } }
    );
    
    console.log('Tiramisu image fixed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixTiramisuImage();