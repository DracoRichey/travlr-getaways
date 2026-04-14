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
    type: String,
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
}, { timestamps: true });

tripSchema.index({ destination: 1 });
tripSchema.index({ departureDate: 1 });

mongoose.model('Trip', tripSchema);