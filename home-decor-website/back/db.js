const mongoose = require('mongoose');

async function connectToDatabase() {
    mongoose.connect('mongodb://localhost:27017/homeDec', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('Could not connect to MongoDB:', error));
}

module.exports = connectToDatabase;
