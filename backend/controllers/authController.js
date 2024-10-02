// File: /backend/controllers/authController.js
// File: backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// User Signup
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User Registered Successfully');
  } catch (error) {
    res.status(400).send('Error Registering User: ' + error.message);
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid Credentials');

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
      role: user.role,
    });
  } catch (error) {
    res.status(400).send('Login Failed: ' + error.message);
  }
};

