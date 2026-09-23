const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 }, // For "affordable" aspect
  image: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Almonds', 'Cashews', 'Mix'
  countInStock: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
