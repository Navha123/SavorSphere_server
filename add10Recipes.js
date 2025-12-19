const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Category = require('./models/Category');
require('dotenv').config();

const add10Recipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const admin = await User.findOne({ role: 'admin' });
    const vegetarian = await Category.findOne({ name: 'Vegetarian' });
    const nonVeg = await Category.findOne({ name: 'Non-Vegetarian' });
    const desserts = await Category.findOne({ name: 'Desserts' });
    const beverages = await Category.findOne({ name: 'Beverages' });

    const recipes = [
      {
        title: 'Butter Chicken',
        description: 'Creamy tomato-based chicken curry',
        ingredients: ['Chicken', 'Butter', 'Tomatoes', 'Cream', 'Spices'],
        steps: ['Marinate chicken', 'Cook in butter', 'Add tomato gravy', 'Simmer with cream'],
        cookingTime: 45,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400']
      },
      {
        title: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        ingredients: ['Romaine lettuce', 'Parmesan', 'Croutons', 'Caesar dressing'],
        steps: ['Wash lettuce', 'Add dressing', 'Top with cheese and croutons'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400']
      },
      {
        title: 'Chocolate Cake',
        description: 'Moist chocolate layer cake',
        ingredients: ['Flour', 'Cocoa', 'Sugar', 'Eggs', 'Butter'],
        steps: ['Mix dry ingredients', 'Add wet ingredients', 'Bake layers', 'Assemble with frosting'],
        cookingTime: 60,
        difficulty: 'Hard',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400']
      },
      {
        title: 'Mango Smoothie',
        description: 'Refreshing tropical mango smoothie',
        ingredients: ['Mango', 'Yogurt', 'Honey', 'Ice'],
        steps: ['Peel mango', 'Blend all ingredients', 'Serve chilled'],
        cookingTime: 5,
        difficulty: 'Easy',
        category: beverages._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400']
      },
      {
        title: 'Fish Tacos',
        description: 'Grilled fish with fresh toppings',
        ingredients: ['Fish fillets', 'Tortillas', 'Cabbage', 'Lime', 'Cilantro'],
        steps: ['Grill fish', 'Warm tortillas', 'Assemble with toppings'],
        cookingTime: 20,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=400']
      },
      {
        title: 'Caprese Salad',
        description: 'Fresh mozzarella with tomatoes and basil',
        ingredients: ['Mozzarella', 'Tomatoes', 'Basil', 'Olive oil', 'Balsamic'],
        steps: ['Slice ingredients', 'Arrange on plate', 'Drizzle with oil'],
        cookingTime: 10,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400']
      },
      {
        title: 'Tiramisu',
        description: 'Classic Italian coffee-flavored dessert',
        ingredients: ['Ladyfingers', 'Coffee', 'Mascarpone', 'Eggs', 'Cocoa'],
        steps: ['Dip ladyfingers in coffee', 'Layer with mascarpone', 'Chill overnight'],
        cookingTime: 30,
        difficulty: 'Hard',
        category: desserts._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400']
      },
      {
        title: 'Green Tea',
        description: 'Soothing traditional green tea',
        ingredients: ['Green tea leaves', 'Hot water', 'Honey'],
        steps: ['Heat water to 80°C', 'Steep tea for 3 minutes', 'Add honey if desired'],
        cookingTime: 5,
        difficulty: 'Easy',
        category: beverages._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400']
      },
      {
        title: 'Beef Stir Fry',
        description: 'Quick beef and vegetable stir fry',
        ingredients: ['Beef strips', 'Bell peppers', 'Onions', 'Soy sauce', 'Garlic'],
        steps: ['Heat oil in wok', 'Stir fry beef', 'Add vegetables', 'Season and serve'],
        cookingTime: 15,
        difficulty: 'Medium',
        category: nonVeg._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400']
      },
      {
        title: 'Fruit Salad',
        description: 'Mixed seasonal fresh fruits',
        ingredients: ['Apples', 'Oranges', 'Grapes', 'Berries', 'Honey'],
        steps: ['Wash and cut fruits', 'Mix in bowl', 'Drizzle with honey'],
        cookingTime: 15,
        difficulty: 'Easy',
        category: vegetarian._id,
        author: admin._id,
        images: ['https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400']
      }
    ];

    for (const recipe of recipes) {
      await Recipe.create(recipe);
      console.log(`Added: ${recipe.title}`);
    }
    
    console.log('10 new recipes added successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

add10Recipes();