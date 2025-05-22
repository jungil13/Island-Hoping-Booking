const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// Register a new user
exports.register = (req, res) => {
  const { name, email, password, userType } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const newUser = { name, email, password: hashedPassword, userType };

    User.createUser(newUser, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
};

// Login a user
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    // Check if the user is restricted
    if (user.isRestricted === 1) {
      return res.status(403).json({ error: 'You are restricted from this system' });
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          userType: user.userType,
        },
      });
    });
  });
};
