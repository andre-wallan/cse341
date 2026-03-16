const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    // Add a console log to check if the URI is defined
    console.log('MongoDB URI defined:', process.env.MONGODB_URI ? 'Yes' : 'No');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not defined. Please check your .env file');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;