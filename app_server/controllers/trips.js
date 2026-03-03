const path = require('path');
const fs = require('fs');

// Build the full path to trips.json
const tripsFile = path.join(__dirname, '..', '..', 'data', 'trips.json');

const getTripsData = () => {
  const data = fs.readFileSync(tripsFile);
  return JSON.parse(data);
};

const tripList = (req, res) => {
  const trips = getTripsData();

  res.render('trips-list', {
    title: 'Travlr Getaways – Trips',
    trips: trips
  });
};

module.exports = {
  tripList
};
