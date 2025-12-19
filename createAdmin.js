const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/savorsphere');
    
    const adminExists = await User.findOne({ email: 'admin@savorsphere.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const admin = await User.create({
      name: 'Admin User',
      username: 'admin',
      email: 'admin@savorsphere.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@savorsphere.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();