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

    return await Product.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { subcategory: { $regex: query, $options: 'i' } }
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
