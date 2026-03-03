// Home page controller
module.exports.index = (req, res) => {
  res.render('home', {
    title: 'Travlr | Explore the world',
    hero: {
      heading: 'Find your next adventure',
      sub: 'Curated trips for every style and budget.'
    },
    ctaText: 'Browse Trips'
  });
};
