const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const travelController = require('../controllers/travel');

// Home page
router.get('/', ctrlMain.index);

// Travel dynamic page
router.get('/travel', travelController.travel);

module.exports = router;
