const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,   // includes the "$", so keep it as String
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  }
});

// Register the model with Mongoose
mongoose.model('Trip', tripSchema);
