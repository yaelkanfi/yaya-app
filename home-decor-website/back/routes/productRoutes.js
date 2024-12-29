const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// Route to delete all products
router.delete('/', async (req, res) => {
    try {
        await productService.deleteAllProducts();
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to search products
router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const products = await productService.searchProducts(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a product
router.post('/add', async (req, res) => {
    try {
        const savedProduct = await productService.addProduct(req.body);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all products of a subcategory
router.get('/:category/:subcategory', async (req, res) => {
    try {
        const products = await productService.getProductsBySubcategory(req.params.subcategory);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
