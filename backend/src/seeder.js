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
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.create([
      { name: 'Admin User', email: 'admin@dryfruit.com', password: 'password123', role: 'admin' },
      { name: 'John Doe Customer', email: 'john@example.com', password: 'password123', role: 'user' }
    ]);

    await Product.insertMany(products);
    console.log('Data Successfully Seeded');
    process.exit();
  } catch (error) {
    console.error(`Error in Seeding Data: ${error.message}`);
    process.exit(1);
  }
};

importData();
