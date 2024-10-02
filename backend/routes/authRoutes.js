// File: backend/routes/authRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Define routes for signup and login
router.post('/signup', signup);  // Define the signup route correctly
router.post('/login', login);    // Define the login route correctly

module.exports = router;
