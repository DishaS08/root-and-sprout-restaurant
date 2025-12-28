const Order = require('../models/Order');
const Coupon = require('../models/Coupon'); // Import Coupon model

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        console.log("Received order request:", JSON.stringify(req.body, null, 2));
        const {
            items,
            deliveryAddress,
            paymentMethod,
            subtotal,
            tax,
            deliveryFee,
            discount,
            total,
            couponUsed,
        } = req.body;

        const order = await Order.create({
            user: req.userId,
            items,
            deliveryAddress,
            paymentMethod,
            subtotal,
            tax,
            deliveryFee,
            discount,
            total,
            couponUsed,
        });

        // Mark coupon as used if applicable
        if (couponUsed) {
            const coupon = await Coupon.findOne({ code: couponUsed });
            if (coupon) {
                coupon.usedBy.push(req.userId);
                await coupon.save();
            }
        }

        console.log("Order created successfully:", order._id);
        res.status(201).json(order);
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's order history
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order belongs to user
        if (order.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById };
