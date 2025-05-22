const express = require('express');
const { createBooking, getAllBookings, getMyBookings , updateStatus, deleteBooking} = require('../controllers/BookingController');
const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBookings);
router.get('/mybookings', getMyBookings);
router.put('/bookings/:id', updateStatus);
router.delete('/bookings/:id', deleteBooking);


module.exports = router;
