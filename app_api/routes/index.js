const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');



// Controllers
const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

// AUTH
router.post('/login', ctrlAuth.login);

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(requireAuth, ctrlTrips.tripsCreate);

router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsFindById)
  .put(requireAuth, ctrlTrips.tripsUpdateOne)
  .delete(requireAuth, ctrlTrips.tripsDeleteOne);

module.exports = router;

