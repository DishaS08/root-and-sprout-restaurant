const { sendReservationConfirmation } = require('../utils/emailService');
const User = require('../models/User');
const Reservation = require('../models/Reservation');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res) => {
    try {
        console.log("Received reservation request:", req.body);
        const { name, phone, guests, date, timeSlot, specialRequests } = req.body;

        const reservation = await Reservation.create({
            user: req.userId,
            name,
            phone,
            guests,
            date,
            timeSlot,
            specialRequests,
        });

        // Send confirmation email
        try {
            const user = await User.findById(req.userId);
            if (user) {
                await sendReservationConfirmation(user.email, user.name, {
                    date,
                    time: timeSlot,
                    guests,
                    tableId: reservation._id
                });
            }
        } catch (emailError) {
            console.error('Failed to send reservation confirmation email:', emailError);
        }

        console.log("Reservation created:", reservation);
        res.status(201).json(reservation);
    } catch (error) {
        console.error("Create reservation error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's reservations
// @route   GET /api/reservations
// @access  Private
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel reservation
// @route   DELETE /api/reservations/:id
// @access  Private
const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Check if reservation belongs to user
        if (reservation.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to cancel this reservation' });
        }

        reservation.status = 'cancelled';
        await reservation.save();

        res.json({ message: 'Reservation cancelled successfully', reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReservation, getReservations, cancelReservation };
