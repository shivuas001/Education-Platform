const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('<username>')) {
      console.warn("⚠️ Warning: MONGODB_URI is not correctly set. Please update your .env file with your real MongoDB Atlas connection string.");
      return false;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Modern mongoose handles useNewUrlParser and useUnifiedTopology inherently, but keeping options clean
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
