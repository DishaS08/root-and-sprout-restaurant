const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

const { sendFeedbackAck } = require('../utils/emailService');



// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const newFeedback = new Feedback({
            name,
            email,
            subject,
            message
        });

        const savedFeedback = await newFeedback.save();

        // Send acknowledgement email
        try {
            await sendFeedbackAck(email, name);
        } catch (emailError) {
            console.error('Failed to send feedback acknowledgement email:', emailError);
        } res.status(201).json(savedFeedback);
    } catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({ message: 'Server error saving feedback' });
    }
});

module.exports = router;
