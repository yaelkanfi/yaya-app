const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imagePath: String,
  category: String,
  subcategory: String,
  //date - for sort
  //stock - for availability filter
});

module.exports = mongoose.model('Product', productSchema);