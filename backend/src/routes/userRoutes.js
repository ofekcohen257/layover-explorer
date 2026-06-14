const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User Registration
router.post('/register', (req, res) => UserController.register(req, res));

// Set Preferences
router.post('/:userId/preferences', (req, res) => UserController.setPreferences(req, res));

module.exports = router;
