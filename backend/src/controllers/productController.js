const Product = require('../models/Product');
const mockProducts = require('../data/products');
const mongoose = require('mongoose');

const getProductsList = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      return await Product.find({});
    } catch {
    }
  }
  return mockProducts.map((p, idx) => ({ _id: p._id || String(idx + 1), ...p }));
};

const getProducts = async (req, res) => {
  try {
    res.json(await getProductsList());
  } catch {
    res.status(500).json({ message: 'Server Error loading products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await getProductsList();
    const product = products.find((p) => String(p._id) === req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Dryfruit not found' });
  } catch {
    res.status(500).json({ message: 'Server Error loading product' });
  }
};

module.exports = { getProducts, getProductById };
