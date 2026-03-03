var fs = require('fs');

// Read trips from the JSON file in the ROOT data folder
var trips = JSON.parse(
  fs.readFileSync('./data/trips.json', 'utf8')
);

module.exports.travel = function(req, res) {
  res.render('travel', {
    title: 'Travel',
    trips: trips
  });
};
