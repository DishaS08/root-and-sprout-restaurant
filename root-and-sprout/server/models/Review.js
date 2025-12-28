const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        unique: true
    },
    items: [{
        name: String,
        rating: { type: Number, min: 1, max: 5 }
    }],
    rating: { // Overall rating (calculated or general)
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false // Optional
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
