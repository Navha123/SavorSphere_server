const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const userExists = await User.findOne({ email: 'user@test.com' });
    if (userExists) {
      console.log('Test user already exists');
      return;
    }

    const user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'user@test.com',
      password: 'user123',
      role: 'user'
    });

    console.log('Test user created successfully:');
    console.log('Email: user@test.com');
    console.log('Password: user123');
    
  } catch (error) {
    console.error('Error creating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createTestUser();