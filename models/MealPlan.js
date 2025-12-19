const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  meals: [{
    date: { type: Date, required: true },
    mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    servings: { type: Number, default: 1 },
    notes: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);