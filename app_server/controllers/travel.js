const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

module.exports.travel = async function(req, res) {
  try {
    const trips = await Trip.find().exec();
    res.render('travel', {
      title: 'Travel',
      trips: trips
    });
  } catch (err) {
    console.log('Error fetching trips:', err);
    res.status(500).render('error', { message: 'Error loading trips' });
  }
};