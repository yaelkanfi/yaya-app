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
      { name: "Dinning Table" },
      { $set: { images: ["/uploads/images/table1.jpeg", "/uploads/images/table2.jpeg", "/uploads/images/table3.jpeg"] } }
    );

    console.log(`${result.modifiedCount} products updated.`);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.disconnect(); // Close the database connection
  }
}

updateExistingProducts();
