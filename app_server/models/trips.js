const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    console.log('Error getting trips:', err);
    res.status(500).json({ message: 'Error getting trips' });
  }
};

const tripsFindById = async (req, res) => {
  const tripId = req.params.tripId;

  // Basic validation that it's a valid Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Success
    res.status(200).json(trip);
  } catch (err) {
    console.log('Error finding trip:', err);
    res.status(500).json({ message: 'Error finding trip' });
  }
};

module.exports = {
  tripsList,
  tripsFindById
};