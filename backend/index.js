// File: backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import the authentication routes
const authRoutes = require('./routes/authRoutes');

// Initialize environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json());

// Define the base route for authentication
app.use('/api/auth', authRoutes);  // Set the base route for authentication routes

// Root route for testing if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the CropCart API!');
});

// MongoDB connection using Mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

// Start the server on the specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
