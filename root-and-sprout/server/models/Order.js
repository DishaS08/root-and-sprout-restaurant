const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        id: String,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
    }],
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'card', 'upi', 'cod'], // Added cod
    },
    subtotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    couponUsed: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
