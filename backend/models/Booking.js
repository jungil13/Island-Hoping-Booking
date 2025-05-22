const db = require('../config/db');

const Booking = {
  create: (bookingData) => {
    return new Promise((resolve, reject) => {
      const { user_id, date, boat_rate_id, total_price, payment_method, selectedIslands } = bookingData;

      // Insert into the bookings table
      db.query(
        `INSERT INTO bookings (user_id, date, boat_rate_id, total_price, payment_method) 
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, date, boat_rate_id, total_price, payment_method],
        (err, results) => {
          if (err) {
            console.error('Error inserting booking:', err); // Log the error for debugging
            return reject(err);
          }

          // Get the booking ID of the newly created booking
          const booking_id = results.insertId;

          // Insert the selected islands into the booking_islands table
          const islandQueries = selectedIslands.map((island_id) => {
            return new Promise((resolve, reject) => {
              const islandQuery = 'INSERT INTO booking_islands (booking_id, island_id, created_at) VALUES (?, ?, NOW())';
              db.query(islandQuery, [booking_id, island_id], (err, result) => {
                if (err) {
                  console.error('Error inserting island:', err); // Log the error for debugging
                  return reject(err);
                }
                resolve(result);
              });
            });
          });

          // Wait for all island insertions to complete
          Promise.all(islandQueries)
            .then(() => {
              resolve({ message: 'Booking created successfully', booking_id });
            })
            .catch((err) => {
              console.error('Error adding islands to booking:', err); // Log the error for debugging
              reject({ message: 'Error adding islands to booking', error: err });
            });
        }
      );
    });
  },

  updateBookingStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE bookings SET status = ? WHERE id = ?';
      db.query(query, [status, id], (err, result) => {
        if (err) {
          console.error('Error updating booking status:', err); // Log the error for debugging
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  deleteBookingById: (id) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Booking ID is required'));
      }

      // Query to delete the booking by ID
      db.query('DELETE FROM bookings WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error deleting booking:', err); // Log the error for debugging
          return reject(err);
        }

        // Check if a row was affected
        if (result.affectedRows > 0) {
          resolve(true); // Successfully deleted
        } else {
          resolve(false); // No booking found with the provided ID
        }
      });
    });
  },

};



module.exports = Booking;
