const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:id', userController.getUserById);

// Update user details (including profile photo)
router.put('/users/:id', userController.upload.single('profilePhoto'), userController.updateUser);

// Restrict a user
router.put('/users/restrict/:id', userController.restrictUser);

module.exports = router;
