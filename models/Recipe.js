const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [mongoose.Schema.Types.Mixed],
  steps: [{ type: String, required: true }],
  images: [{ type: String }],
  cookingTime: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 },
  servings: { type: Number, default: 4 },
  nutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 }, // grams
    carbs: { type: Number, default: 0 }, // grams
    fat: { type: Number, default: 0 }, // grams
    fiber: { type: Number, default: 0 }, // grams
    sugar: { type: Number, default: 0 } // grams
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);