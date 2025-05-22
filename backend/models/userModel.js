const db = require('../config/db');

class User {
  static createUser(data, callback) {
    const { name, email, password, userType } = data;
    const sql = `
      INSERT INTO users (name, email, password, userType)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [name, email, password, userType || 'user'], callback);
  }

  static findByEmail(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  }
}

module.exports = User;
