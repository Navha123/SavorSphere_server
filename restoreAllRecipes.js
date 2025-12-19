const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const restoreAllRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    await Recipe.deleteMany({});
    
    const admin = await User.findOne({ role: 'admin' });
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const nonVeg = await Category.findOne({ name: 'Non-Vegetarian' });
    const desserts = await Category.findOne({ name: 'Desserts' });
    const beverages = await Category.findOne({ name: 'Beverages' });

    const recipes = [
      {
        title: 'Classic Paneer Butter Masala',
        description: 'Rich and creamy paneer curry with aromatic spices',
        ingredients: ['250g paneer', '1 cup tomato puree', '1 onion', '2 tbsp butter', '3 tbsp fresh cream', '1/2 tsp garam masala', '1 tsp ginger garlic paste', '1 tsp red chilli powder', 'Salt to taste'],
        steps: ['Cut paneer into cubes', 'Heat butter in pan', 'Add onions and cook', 'Add tomato puree', 'Add spices and cream', 'Add paneer and simmer', 'Garnish and serve'],
        cookingTime: 30,
        difficulty: 'Medium',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400']
      },
      {
        title: 'Vegetable Fried Rice',
        description: 'Colorful and flavorful fried rice with mixed vegetables',
        ingredients: ['2 cups cooked rice', '1 cup mixed vegetables', '2 eggs', '3 tbsp oil', '2 tbsp soy sauce', '1 tsp garlic', 'Salt and pepper'],
        steps: ['Heat oil in wok', 'Scramble eggs', 'Add vegetables', 'Add rice and soy sauce', 'Stir fry everything', 'Season and serve'],
        cookingTime: 20,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400']
      },
      {
        title: 'Chicken Curry',
        description: 'Spicy and aromatic chicken curry with traditional spices',
        ingredients: ['500g chicken', '2 onions', '3 tomatoes', '2 tbsp curry powder', '400ml coconut milk', '4 cloves garlic', '1 inch ginger', 'Salt and pepper'],
        steps: ['Marinate chicken', 'Sauté onions', 'Add garlic and ginger', 'Add tomatoes', 'Add chicken and spices', 'Pour coconut milk', 'Simmer until cooked'],
        cookingTime: 45,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400']
      },
      {
        title: 'Classic Lemon Iced Tea',
        description: 'Refreshing lemon iced tea perfect for summer',
        ingredients: ['4 tea bags', '4 cups water', '1/4 cup sugar', '1/4 cup lemon juice', 'Ice cubes', 'Lemon slices'],
        steps: ['Boil water and steep tea', 'Add sugar while hot', 'Cool completely', 'Add lemon juice', 'Serve over ice', 'Garnish with lemon'],
        cookingTime: 15,
        difficulty: 'Easy',
        category: beverages._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400']
      },
      {
        title: 'Chocolate Brownies',
        description: 'Fudgy and rich chocolate brownies',
        ingredients: ['200g dark chocolate', '150g butter', '200g sugar', '3 eggs', '100g flour', '50g cocoa powder', '1 tsp vanilla'],
        steps: ['Melt chocolate and butter', 'Mix in sugar and eggs', 'Add flour and cocoa', 'Pour into pan', 'Bake 25 minutes', 'Cool and cut'],
        cookingTime: 40,
        difficulty: 'Medium',
        category: desserts._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400']
      },
      {
        title: 'Margherita Pizza',
        description: 'Classic Italian pizza with tomato, mozzarella and basil',
        ingredients: ['1 pizza dough', '1/2 cup tomato sauce', '200g mozzarella', 'Fresh basil', '2 tbsp olive oil', 'Salt and pepper'],
        steps: ['Roll out dough', 'Spread tomato sauce', 'Add mozzarella', 'Bake 12-15 minutes', 'Add fresh basil', 'Drizzle olive oil'],
        cookingTime: 25,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400']
      },
      {
        title: 'Butter Chicken',
        description: 'Creamy tomato-based chicken curry',
        ingredients: ['500g chicken', '2 tbsp butter', '1 cup tomatoes', '1/2 cup cream', 'Spices'],
        steps: ['Marinate chicken', 'Cook in butter', 'Add tomato gravy', 'Simmer with cream'],
        cookingTime: 45,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400']
      },
      {
        title: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
        steps: ['Wash lettuce', 'Add dressing', 'Top with cheese and croutons'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400']
      },
      {
        title: 'Chocolate Cake',
        description: 'Moist chocolate layer cake',
        ingredients: ['2 cups flour', '1 cup cocoa', '2 cups sugar', '3 eggs', '1 cup butter'],
        steps: ['Mix dry ingredients', 'Add wet ingredients', 'Bake layers', 'Assemble with frosting'],
        cookingTime: 60,
        difficulty: 'Hard',
        category: desserts._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400']
      },
      {
        title: 'Mango Smoothie',
        description: 'Refreshing tropical mango smoothie',
        ingredients: ['2 ripe mangoes', '1 cup yogurt', '2 tbsp honey', '1/2 cup milk', 'Ice cubes'],
        steps: ['Peel and chop mangoes', 'Blend all ingredients', 'Add ice for thickness', 'Serve chilled'],
        cookingTime: 5,
        difficulty: 'Easy',
        category: beverages._id,
        author: admin._id,
        isApproved: true,
        images: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400']
      }
    ];

    for (const recipe of recipes) {
      await Recipe.create(recipe);
      console.log(`Added: ${recipe.title}`);
    }
    
    console.log('All recipes restored successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

restoreAllRecipes();