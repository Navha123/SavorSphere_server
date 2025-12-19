const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    await Recipe.updateOne(
      { title: 'Caprese Salad' },
      { $set: { images: ['https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400'] } }
    );
    
    await Recipe.updateOne(
      { title: 'Green Tea' },
      { $set: { images: ['https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400'] } }
    );
    
    console.log('Caprese Salad and Green Tea images fixed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

fixImages();