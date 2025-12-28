const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

// @route   POST /api/reviews
// @desc    Add a review
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { orderId, items, comment } = req.body;

        if (!orderId || !items || items.length === 0) {
            return res.status(400).json({ message: 'Please provide order ID and item ratings' });
        }

        // Check if review already exists for this order
        const existingReview = await Review.findOne({ order: orderId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this order' });
        }

        // Calculate overall average rating from items
        const overallRating = items.reduce((acc, item) => acc + item.rating, 0) / items.length;

        const newReview = new Review({
            user: req.userId,
            order: orderId,
            items,
            rating: overallRating,
            comment // Optional
        });

        const savedReview = await newReview.save();
        await savedReview.populate('user', 'name avatar');

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Review error:', error);
        res.status(500).json({ message: 'Server error saving review' });
    }
});

// @route   GET /api/reviews/my-reviews
// @desc    Get logged-in user's reviews
// @access  Private
router.get('/my-reviews', protect, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.userId });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).json({ message: 'Server error fetching your reviews' });
    }
});

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name avatar');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching reviews' });
    }
});

module.exports = router;
