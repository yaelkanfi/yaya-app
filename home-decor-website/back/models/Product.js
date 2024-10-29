const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  category: String,
});

module.exports = mongoose.model('Product', productSchema);