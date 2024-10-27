const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.json(product);
      } catch (err) {
        res.status(500).send(err.message);
      }
});

module.exports = router;