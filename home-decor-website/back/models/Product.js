const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageBase64: String,
  category: String,
  subcategory: String,
});

module.exports = mongoose.model('Product', productSchema);
