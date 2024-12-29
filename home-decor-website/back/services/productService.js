const Product = require('../models/Product');

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get products by subcategory
const getProductsBySubcategory = async (subcategory) => {
    return await Product.find({ subcategory });
};

// Get product by ID
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Search for products
const searchProducts = async (query) => {
    const regex = new RegExp(`\\b${query}\\b`, 'i');
    return await Product.find({
        $or: [
            { name: regex },
            { description: regex },
            { subcategory: regex }
        ]
    });
};

// Add a new product
const addProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Delete all products
const deleteAllProducts = async () => {
    return await Product.deleteMany();
};

module.exports = {
    getAllProducts,
    getProductsBySubcategory,
    getProductById,
    searchProducts,
    addProduct,
    deleteAllProducts,
};
