const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const fs = require('fs');

function encodeImageToBase64(filePath) {
    const image = fs.readFileSync(filePath, 'base64'); // Read image as a Buffer and encode to base64
    return image;
}

// Route to delete all products
router.delete('/', async (req, res) => {
    try {
        await Product.deleteMany(); // Deletes all products
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to search products
router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        // Case-insensitive search for products where name or description contains the query term
        const regex = new RegExp(`\\b${query}\\b`, 'i');

        const products = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { subcategory: regex }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a product
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, imageBase64, category, subcategory } = req.body;

        // Convert the image to a Base64 string
        const base64 = imageBase64 ? encodeImageToBase64(imageBase64) : '';

        // Create new product with Base64 encoded image
        const newProduct = new Product({
            name,
            description,
            price,
            base64,
            category,
            subcategory
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all products of a subcategory
router.get('/:category/:subcategory', async (req, res) => {
    try {
        const products = await Product.find({ subcategory: req.params.subcategory });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
