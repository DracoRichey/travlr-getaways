// app_api/controllers/trips.js

const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET /api/trips  -------------------------
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    console.log('Error getting trips:', err);
    res.status(500).json({ message: 'Error getting trips' });
  }
};

// GET /api/trips/:tripId  -----------------
const tripsFindById = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    console.log('Error finding trip:', err);
    res.status(500).json({ message: 'Error finding trip' });
  }
};

// POST /api/trips  ------------------------
// Insert directly into the Mongo collection to avoid Mongoose validation issues.
const tripsCreate = async (req, res) => {
  try {
    console.log('tripsCreate hit. Body is:', req.body);

    // If nothing came through, complain clearly
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No body received' });
    }

    // Insert raw doc into the underlying collection
    const result = await Trip.collection.insertOne(req.body);

    // Read it back using Mongoose so it looks like other trips
    const insertedTrip = await Trip.findById(result.insertedId).exec();

    return res.status(201).json(insertedTrip);
  } catch (err) {
    console.log('Error creating trip:', err);
    return res.status(400).json({ message: 'Error creating trip', error: err });
  }
};

// PUT /api/trips/:tripId  -----------------
const tripsUpdateOne = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    const updated = await Trip.findByIdAndUpdate(tripId, req.body, {
      new: true
    }).exec();

    if (!updated) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.log('Error updating trip:', err);
    return res.status(400).json({ message: 'Error updating trip', error: err });
  }
};

// DELETE /api/trips/:tripId  --------------
const tripsDeleteOne = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    await Trip.findByIdAndDelete(tripId).exec();
    return res.status(204).json(null);
  } catch (err) {
    console.log('Error deleting trip:', err);
    return res.status(400).json({ message: 'Error deleting trip', error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindById,
  tripsCreate,
  tripsUpdateOne,
  tripsDeleteOne
};
