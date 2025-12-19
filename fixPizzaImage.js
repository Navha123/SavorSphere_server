const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const fixPizzaImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    await Recipe.updateOne(
      { title: 'Margherita Pizza' },
      { $set: { images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'] } }
    );
    
    console.log('Pizza image fixed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixPizzaImage();