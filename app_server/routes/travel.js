const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

// Travel page powered by travel.js controller
router.get('/', ctrlTravel.travel);

module.exports = router;
