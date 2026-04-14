// app_api/controllers/trips.js

const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET /api/trips  -------------------------
const tripsList = async (req, res) => {
  try {
    const { search, sortBy, order, before, after } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { destination: regex },
        { description: regex }
      ];
    }

    if (before) filter.departureDate = { ...filter.departureDate, $lte: new Date(before) };
    if (after) filter.departureDate = { ...filter.departureDate, $gte: new Date(after) };

    // Build sort object
    const sortField = sortBy || 'departureDate';
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    const trips = await Trip.find(filter).sort(sort).exec();
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

    const trip = new Trip(req.body);
    const saved = await trip.save();
    return res.status(201).json(saved);
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

// GET /api/trips/report  ------------------
const tripsReport = async (req, res) => {
  try {
    const results = await Trip.aggregate([
      // 1. Only future trips
      { $match: { departureDate: { $gte: new Date() } } },

      // 2. Cast price string to number
      { $addFields: { priceNum: { $toDouble: '$price' } } },

      // 3. Group by destination
      {
        $group: {
          _id: '$destination',
          tripCount: { $sum: 1 },
          avgPrice: { $avg: '$priceNum' },
          minPrice: { $min: '$priceNum' },
          maxPrice: { $max: '$priceNum' }
        }
      },

      // 4. Most popular destinations first
      { $sort: { tripCount: -1 } }
    ]);

    return res.status(200).json(results);
  } catch (err) {
    console.log('Error running trips report:', err);
    return res.status(500).json({ message: 'Error running trips report' });
  }
};

module.exports = {
  tripsList,
  tripsFindById,
  tripsCreate,
  tripsUpdateOne,
  tripsDeleteOne,
  tripsReport
};
