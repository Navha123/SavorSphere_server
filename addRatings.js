const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
require('dotenv').config();

const addRatings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const user = await User.findOne({ role: 'admin' });
    const recipes = await Recipe.find({});

    const ratingsData = [
      { title: 'Classic Paneer Butter Masala', ratings: [5, 4, 5, 4, 5] },
      { title: 'Vegetable Fried Rice', ratings: [4, 4, 3, 5, 4] },
      { title: 'Chicken Curry', ratings: [5, 5, 4, 5, 4] },
      { title: 'Classic Lemon Iced Tea', ratings: [4, 3, 4, 4, 3] },
      { title: 'Chocolate Brownies', ratings: [5, 5, 5, 4, 5] },
      { title: 'Margherita Pizza', ratings: [4, 5, 4, 4, 5] },
      { title: 'Butter Chicken', ratings: [5, 4, 5, 5, 4] },
      { title: 'Caesar Salad', ratings: [4, 3, 4, 4, 3] },
      { title: 'Chocolate Cake', ratings: [5, 5, 4, 5, 5] },
      { title: 'Mango Smoothie', ratings: [4, 4, 5, 4, 4] },
      { title: 'Spaghetti Carbonara', ratings: [5, 4, 5, 4, 5] },
      { title: 'Greek Salad', ratings: [4, 4, 3, 4, 4] },
      { title: 'Beef Tacos', ratings: [4, 5, 4, 4, 5] },
      { title: 'Strawberry Cheesecake', ratings: [5, 5, 4, 5, 4] },
      { title: 'Green Smoothie Bowl', ratings: [4, 4, 5, 4, 4] },
      { title: 'Mushroom Risotto', ratings: [5, 4, 4, 5, 4] }
    ];

    for (const ratingData of ratingsData) {
      const recipe = recipes.find(r => r.title === ratingData.title);
      if (recipe) {
        const ratings = ratingData.ratings.map(rating => ({
          user: user._id,
          rating: rating
        }));
        
        const avgRating = ratingData.ratings.reduce((sum, r) => sum + r, 0) / ratingData.ratings.length;
        
        await Recipe.updateOne(
          { _id: recipe._id },
          { 
            $set: { 
              ratings: ratings,
              averageRating: Math.round(avgRating * 10) / 10
            }
          }
        );
        console.log(`Added ratings to: ${ratingData.title} (Avg: ${avgRating.toFixed(1)})`);
      }
    }
    
    console.log('All ratings added successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

addRatings();