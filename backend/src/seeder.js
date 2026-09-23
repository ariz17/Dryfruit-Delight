const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Wipe everything to prevent duplicates
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Insert mock admin user
    const createdUsers = await User.create([
      { name: 'Admin User', email: 'admin@dryfruit.com', password: 'password123', role: 'admin' },
      { name: 'John Doe Customer', email: 'john@example.com', password: 'password123', role: 'user' }
    ]);

    // 3. Insert dry fruit products
    await Product.insertMany(products);

    console.log('✅ Base Data Successfully Seeded! Products and Users loaded.');
    process.exit();
  } catch (error) {
    console.error(`❌ Error Seeding Data: ${error.message}`);
    process.exit(1);
  }
};

importData();
