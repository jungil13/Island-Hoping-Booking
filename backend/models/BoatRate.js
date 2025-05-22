const db = require('../config/db');

const BoatRate = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM boat_rates', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = BoatRate;
