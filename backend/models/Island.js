const db = require('../config/db');

const Island = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM islands', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Island;
