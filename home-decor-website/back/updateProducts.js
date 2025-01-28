const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path as needed

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/homeDec', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('Could not connect to MongoDB:', error));

async function updateExistingProducts() {
  try {
    // Update all products with default stock and arrivalDate if not already set
    const result = await Product.updateMany(
      { imagePath: "/home/yael/web/home-decor-website/back/uploads/images/SolidWoodTable.jpeg"}, // Match documents without these fields
      {
        $set: {
          imagePath: "/uploads/images/SolidWoodTable.jpeg", // Default stock value
        },
      }
    );

    console.log(`${result.modifiedCount} products updated.`);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.disconnect(); // Close the database connection
  }
}

updateExistingProducts();
