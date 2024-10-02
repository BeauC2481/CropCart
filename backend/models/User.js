const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Supplier', 'Buyer', 'Transporter'], required: true }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
