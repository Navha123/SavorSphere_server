const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const add6NewRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const admin = await User.findOne({ role: 'admin' });
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const nonVeg = await Category.findOne({ name: 'Non-Vegetarian' });
    const desserts = await Category.findOne({ name: 'Desserts' });
    const beverages = await Category.findOne({ name: 'Beverages' });

    const newRecipes = [
      {
        title: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with eggs, cheese, and pancetta',
        ingredients: ['400g spaghetti', '200g pancetta', '4 large eggs', '100g parmesan', '2 cloves garlic', 'Black pepper', 'Salt'],
        steps: ['Boil spaghetti', 'Cook pancetta until crispy', 'Beat eggs with parmesan', 'Mix hot pasta with egg mixture', 'Add pancetta and serve'],
        cookingTime: 25,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400']
      },
      {
        title: 'Greek Salad',
        description: 'Fresh Mediterranean salad with feta cheese and olives',
        ingredients: ['2 tomatoes', '1 cucumber', '1 red onion', '200g feta cheese', 'Kalamata olives', 'Olive oil', 'Oregano'],
        steps: ['Chop vegetables', 'Add feta and olives', 'Drizzle with olive oil', 'Season with oregano'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400']
      },
      {
        title: 'Beef Tacos',
        description: 'Spicy ground beef tacos with fresh toppings',
        ingredients: ['500g ground beef', '8 taco shells', '1 onion', '2 tomatoes', 'Lettuce', 'Cheese', 'Taco seasoning'],
        steps: ['Cook ground beef with seasoning', 'Warm taco shells', 'Prepare toppings', 'Assemble tacos'],
        cookingTime: 20,
        difficulty: 'Easy',
        category: nonVeg._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=400']
      },
      {
        title: 'Strawberry Cheesecake',
        description: 'Creamy no-bake cheesecake with fresh strawberries',
        ingredients: ['300g cream cheese', '200ml heavy cream', '100g sugar', '200g graham crackers', '100g butter', 'Fresh strawberries'],
        steps: ['Make crust with crackers and butter', 'Beat cream cheese and sugar', 'Fold in whipped cream', 'Set in fridge', 'Top with strawberries'],
        cookingTime: 30,
        difficulty: 'Medium',
        category: desserts._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400']
      },
      {
        title: 'Green Smoothie Bowl',
        description: 'Healthy smoothie bowl with spinach, banana and toppings',
        ingredients: ['2 bananas', '1 cup spinach', '1/2 avocado', '1 cup almond milk', 'Granola', 'Berries', 'Chia seeds'],
        steps: ['Blend banana, spinach, avocado and milk', 'Pour into bowl', 'Add toppings', 'Serve immediately'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: beverages._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400']
      },
      {
        title: 'Mushroom Risotto',
        description: 'Creamy Italian rice dish with mixed mushrooms',
        ingredients: ['300g arborio rice', '500g mixed mushrooms', '1L vegetable stock', '1 onion', '100ml white wine', 'Parmesan', 'Butter'],
        steps: ['Sauté mushrooms', 'Cook onion and rice', 'Add wine', 'Gradually add stock', 'Stir in cheese and butter'],
        cookingTime: 35,
        difficulty: 'Hard',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400']
      }
    ];

    for (const recipe of newRecipes) {
      await Recipe.create(recipe);
      console.log(`Added: ${recipe.title}`);
    }
    
    console.log('6 new recipes added successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

add6NewRecipes();