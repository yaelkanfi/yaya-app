const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectToDatabase = require('./db'); 
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToDatabase();

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});