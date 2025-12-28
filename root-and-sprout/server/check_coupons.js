require('dotenv').config();
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
const connectDB = require('./config/db');

const checkCoupons = async () => {
    try {
        await connectDB();
        const coupons = await Coupon.find({});
        console.log('--- Current Coupons in DB ---');
        coupons.forEach(c => {
            console.log(`Code: ${c.code}, Discount: ${c.discount}, MinOrder: ${c.minOrder}, Active: ${c.active}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkCoupons();
