const express = require('express');
const multer = require('multer');
const path = require('path');
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/profile_photos');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  // File filter to allow only image files
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  };
  
  const upload = multer({ storage, fileFilter });

// Get all users
const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.status(200).json(results);
  });
};

// Get user by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  userModel.getUserById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (!result.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, currentPassword, newPassword, userType } = req.body;
  
    // Prepare the updated user object
    let updatedUser = {};
  
    // Ensure userType defaults to 'user' if not provided
    updatedUser.userType = userType || 'user';
  
    // Validate current password if new password is provided
    if (newPassword && currentPassword) {
      userModel.getUserById(id, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error fetching user' });
        }
  
        if (!result.length) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const user = result[0];
  
        // Compare current password with stored password
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ message: 'Error comparing passwords' });
          }
  
          if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
          }
  
          // Hash the new password before saving
          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ message: 'Error hashing new password' });
            }
  
            // Update the password field
            updatedUser.password = hashedPassword;
  
            // Proceed with updating other fields
            updateUserFields(req, res, id, updatedUser, name, email, phone, address);
          });
        });
      });
    } else {
      // Proceed with updating other fields if no password update is requested
      updateUserFields(req, res, id, updatedUser, name, email, phone, address);
    }
  };
  
  // Helper function to update other fields
  const updateUserFields = (req, res, id, updatedUser, name, email, phone, address) => {
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (phone) updatedUser.phone = phone;
    if (address) updatedUser.address = address;
  
    // If a new profile photo is provided, handle the file update
    if (req.file) {
      updatedUser.profilePhoto = `uploads/profile_photos/${req.file.filename}`;
    }
  
    // Update user in the database
    userModel.updateUser(id, updatedUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating user' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  };
  
// Restrict user
const restrictUser = (req, res) => {
    const { id } = req.params;
    const { isRestricted } = req.body; // Get the new restriction status from the request body
  
    // Update the user's restriction status in the database
    userModel.restrictUser(id, isRestricted, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error restricting user' });
      }
      res.status(200).json({ message: 'User restriction status updated successfully' });
    });
  };
  ;

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  restrictUser,
  upload, // Expose the upload middleware for use in routes
};
