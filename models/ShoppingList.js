const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  items: [{
    ingredient: {
      name: { type: String, required: true },
      unit: { type: String, required: true }
    },
    quantity: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    category: { type: String, default: 'Other' }
  }],
  generatedFrom: [{
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    servings: { type: Number, default: 1 }
  }],
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ShoppingList', shoppingListSchema);