const express = require('express');
const router = express.Router();
const PoiController = require('../controllers/PoiController');

router.get('/', (req, res) => PoiController.getPois(req, res));

module.exports = router;
