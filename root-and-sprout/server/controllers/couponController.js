const Coupon = require('../models/Coupon');

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res) => {
    try {
        const { code, orderTotal } = req.body;
        console.log('Validating Coupon:', { code, orderTotal, userId: req.userId });

        // Validate orderTotal
        const total = parseFloat(orderTotal);
        if (isNaN(total)) {
            return res.status(400).json({ message: 'Invalid order total' });
        }

        const coupon = await Coupon.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid coupon code' });
        }

        // Use the model method to validate
        const validation = coupon.isValidForUser(req.userId, total);

        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        res.json({
            valid: true,
            code: coupon.code,
            discount: coupon.discount,
            message: `₹${coupon.discount} discount applied!`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply coupon to order (mark as used)
// @route   POST /api/coupons/apply
// @access  Private
const applyCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid coupon code' });
        }

        // Add user to usedBy array
        if (!coupon.usedBy.includes(req.userId)) {
            coupon.usedBy.push(req.userId);
            await coupon.save();
        }

        res.json({ message: 'Coupon applied successfully', discount: coupon.discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { validateCoupon, applyCoupon };
