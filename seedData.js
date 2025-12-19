const mongoose = require('mongoose');
const Category = require('./models/Category');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing data
    await Category.deleteMany({});
    await Recipe.deleteMany({});
    
    // Create categories
    const categories = await Category.insertMany([
      { name: 'Vegetarian', description: 'Plant-based recipes' },
      { name: 'Non-Vegetarian', description: 'Meat-based recipes' },
      { name: 'Desserts', description: 'Sweet treats' },
      { name: 'Beverages', description: 'Drinks and smoothies' }
    ]);

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      username: 'admin',
      email: 'admin@savorsphere.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();

    // Create sample recipes
    const recipes = [
      {
        title: 'Chocolate Chip Cookies',
        description: 'Classic homemade chocolate chip cookies that are crispy on the outside and chewy on the inside.',
        ingredients: ['2 cups flour', '1 cup butter', '1/2 cup brown sugar', '1/2 cup white sugar', '2 eggs', '1 tsp vanilla', '1 cup chocolate chips'],
        steps: ['Preheat oven to 375°F', 'Mix dry ingredients', 'Cream butter and sugars', 'Add eggs and vanilla', 'Combine wet and dry ingredients', 'Fold in chocolate chips', 'Bake for 10-12 minutes'],
        cookingTime: 25,
        difficulty: 'Easy',
        category: categories[2]._id,
        author: admin._id,
        isApproved: true,
        isFeatured: true
      },
      {
        title: 'Vegetable Stir Fry',
        description: 'Quick and healthy vegetable stir fry with colorful vegetables and savory sauce.',
        ingredients: ['2 cups mixed vegetables', '2 tbsp oil', '2 cloves garlic', '1 tbsp soy sauce', '1 tsp ginger', 'Salt to taste'],
        steps: ['Heat oil in wok', 'Add garlic and ginger', 'Add vegetables', 'Stir fry for 5 minutes', 'Add soy sauce', 'Serve hot'],
        cookingTime: 15,
        difficulty: 'Easy',
        category: categories[0]._id,
        author: admin._id,
        isApproved: true
      },
      {
        title: 'Grilled Chicken Breast',
        description: 'Juicy and flavorful grilled chicken breast with herbs and spices.',
        ingredients: ['4 chicken breasts', '2 tbsp olive oil', '1 tsp garlic powder', '1 tsp paprika', 'Salt and pepper', 'Fresh herbs'],
        steps: ['Marinate chicken for 30 minutes', 'Preheat grill', 'Grill chicken 6-7 minutes per side', 'Check internal temperature', 'Rest for 5 minutes', 'Serve'],
        cookingTime: 45,
        difficulty: 'Medium',
        category: categories[1]._id,
        author: admin._id,
        isApproved: true
      }
    ];

    await Recipe.insertMany(recipes);
    
    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();