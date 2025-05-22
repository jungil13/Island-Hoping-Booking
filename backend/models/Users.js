const db = require('../config/db');

// Get all users
const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

// Get a user by ID
const getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

// Update user details
const updateUser = (id, user, callback) => {
    let query = 'UPDATE users SET ';
    let values = [];
  
    // Add fields to the query if they are provided
    if (user.name) {
      query += 'name = ?, ';
      values.push(user.name);
    }
    if (user.email) {
      query += 'email = ?, ';
      values.push(user.email);
    }
    if (user.phone) {
      query += 'phone = ?, ';
      values.push(user.phone);
    }
    if (user.address) {
      query += 'address = ?, ';
      values.push(user.address);
    }
    if (user.profilePhoto) {
      query += 'profilePhoto = ?, ';
      values.push(user.profilePhoto);
    }
    if (user.password) {
      query += 'password = ?, ';
      values.push(user.password);
    }
  
    // Remove the trailing comma and space
    query = query.slice(0, -2);
  
    // Add the user ID at the end of the query
    query += ' WHERE id = ?';
    values.push(id);
  
    // Execute the query
    db.query(query, values, callback);
  };
  

// Restrict a user (set isRestricted to 1)
const restrictUser = (userId, isRestricted, callback) => {
    const query = 'UPDATE users SET isRestricted = ? WHERE id = ?';
    db.query(query, [isRestricted, userId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  };
  

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  restrictUser,
};
