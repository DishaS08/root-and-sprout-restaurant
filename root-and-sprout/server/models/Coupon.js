const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    minOrder: {
        type: Number,
        default: 0,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    maxUses: {
        type: Number,
        default: 1, // Single use per user by default
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to check if coupon is valid for a user
couponSchema.methods.isValidForUser = function (userId, orderTotal) {
    const now = new Date();

    // Check if expired
    if (this.expiryDate < now) {
        return { valid: false, message: 'Coupon has expired' };
    }

    // Check if inactive
    if (!this.active) {
        return { valid: false, message: 'Coupon is no longer active' };
    }

    // Check minimum order value
    if (orderTotal < this.minOrder) {
        return { valid: false, message: `Minimum order value is ₹${this.minOrder}` };
    }

    // Check if user has already used this coupon
    if (this.usedBy.includes(userId)) {
        return { valid: false, message: 'You have already used this coupon' };
    }

    return { valid: true, message: 'Coupon is valid' };
};

module.exports = mongoose.model('Coupon', couponSchema);
