const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  date: { type: Date, default: Date.now },
  stock: { type: Number, required: true, default: 0 }, 
});

module.exports = mongoose.model('Product', productSchema);