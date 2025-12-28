const express = require('express');
const router = express.Router();
const { createReservation, getReservations, cancelReservation } = require('../controllers/reservationController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.post('/', protect, createReservation);
router.get('/', protect, getReservations);
router.delete('/:id', protect, cancelReservation);

module.exports = router;
