const Product = require('../models/Product');
const mockProducts = require('../data/products');
const mongoose = require('mongoose');

// Helper to check connection and add mock _ids
const getProductsList = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      return await Product.find({});
    } catch (err) {
      console.warn("DB query error, falling back to mock data:", err.message);
    }
  }
  // Return mock data with mock IDs if they don't have them
  return mockProducts.map((p, idx) => ({
    _id: p._id || String(idx + 1),
    ...p
  }));
};

// @desc    Fetch all dry fruits
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await getProductsList();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading products' });
  }
};

// @desc    Fetch single dry fruit
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const products = await getProductsList();
    const product = products.find(p => String(p._id) === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Dryfruit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading product' });
  }
};

module.exports = { getProducts, getProductById };

