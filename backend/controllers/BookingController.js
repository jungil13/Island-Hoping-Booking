const Booking = require('../models/Booking');
const db = require('../config/db');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  try {
    const result = await Booking.updateBookingStatus(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json({ message: 'Booking status updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status.', error: error.message });
  }
};

const createBooking = async (req, res) => {
    try {
      const { user_id, date, boat_rate_id, total_price, payment_method, selectedIslands } = req.body;
  
      // Check if all required fields are present
      if (!user_id || !date || !boat_rate_id || !total_price || !payment_method || !selectedIslands) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Insert booking data into bookings table
      const result = await Booking.create(req.body);
  
      // Send success response
      res.status(201).json({ message: 'Booking created successfully', bookingId: result.booking_id });
    } catch (err) {
      console.error('Error creating booking:', err);  // Log the error for debugging
      res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
  };
  
  const getMyBookings = async (req, res) => {
    try {
      // Get the user_id from the request (query or body)
      const userId = req.query.user_id || req.body.user_id;
  
      // Check if user_id is provided
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const query = `
        SELECT 
          b.id, 
          b.user_id, 
          b.date, 
          br.capacity AS boat_capacity, 
          br.rate AS boat_rate, 
          b.total_price, 
          b.status, 
          b.payment_method, 
          b.created_at,
          IFNULL(GROUP_CONCAT(i.name SEPARATOR ', '), '') AS islands
        FROM bookings b
        LEFT JOIN boat_rates br ON b.boat_rate_id = br.id
        LEFT JOIN booking_islands bi ON b.id = bi.booking_id
        LEFT JOIN islands i ON bi.island_id = i.id
        WHERE b.user_id = ?  -- Filter by user_id
        GROUP BY b.id;
      `;
  
      db.query(query, [userId], (err, results) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching bookings', error: err.message });
          return;
        }
        res.status(200).json({ bookings: results });
      });
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err.message });
    }
  };
  

  const getAllBookings = async (req, res) => {
    try {
      const query = `
        SELECT 
          b.id, 
          b.user_id, 
          u.name AS user_name, -- Fetch the user's name
          u.email AS user_email, -- Fetch the user's email
          u.phone AS user_phone, -- Fetch the user's phone
          u.address AS user_address, -- Fetch the user's address
          b.date, 
          br.capacity AS boat_capacity, 
          br.rate AS boat_rate, 
          b.total_price, 
          b.status, 
          b.payment_method, 
          b.created_at,
          IFNULL(GROUP_CONCAT(i.name SEPARATOR ', '), '') AS islands
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id -- Join with users table
        LEFT JOIN boat_rates br ON b.boat_rate_id = br.id
        LEFT JOIN booking_islands bi ON b.id = bi.booking_id
        LEFT JOIN islands i ON bi.island_id = i.id
        GROUP BY b.id;
      `;
  
      db.query(query, (err, results) => {
        if (err) {
          res.status(500).json({ message: 'Error fetching bookings', error: err.message });
          return;
        }
        res.status(200).json({ bookings: results });
      });
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err.message });
    }
  };
  
  
  const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
  
    if (!bookingId) {
      return res.status(400).send({ message: 'Booking ID is required' });
    }
  
    try {
      const success = await Booking.deleteBookingById(bookingId);
  
      if (success) {
        res.status(200).send({ message: 'Booking deleted successfully' });
      } else {
        res.status(404).send({ message: 'Booking not found' });
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

module.exports = { createBooking, getAllBookings, getMyBookings, updateStatus, deleteBooking };
