const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

const tripList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.render('trips-list', {
      title: 'Travlr Getaways – Trips',
      trips: trips
    });
  } catch (err) {
    console.log('Error fetching trips:', err);
    res.status(500).render('error', { message: 'Error loading trips' });
  }
};

module.exports = {
  tripList
};