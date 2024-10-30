const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Route to create a product
router.post('/add', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
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

// Route to search products
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        // Case-insensitive search for products where name or description contains the query term
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { subcategory: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(products);
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
