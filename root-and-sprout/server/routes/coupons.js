const express = require('express');
const router = express.Router();
const { validateCoupon, applyCoupon } = require('../controllers/couponController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.post('/validate', protect, validateCoupon);
router.post('/apply', protect, applyCoupon);

module.exports = router;
