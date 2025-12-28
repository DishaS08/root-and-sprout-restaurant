require('dotenv').config();
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
const connectDB = require('./config/db');

const sampleCoupons = [
    {
        code: 'WELCOME10',
        discount: 50,
        minOrder: 200,
        expiryDate: new Date('2025-12-31'),
        maxUses: 1,
        active: true,
    },
    {
        code: 'SAVE20',
        discount: 100,
        minOrder: 500,
        expiryDate: new Date('2025-12-31'),
        maxUses: 1,
        active: true,
    },
    {
        code: 'FESTIVE50',
        discount: 150,
        minOrder: 1000,
        expiryDate: new Date('2025-12-31'),
        maxUses: 1,
        active: true,
    },
];

const seedCoupons = async () => {
    try {
        await connectDB();

        // Clear existing coupons (optional)
        await Coupon.deleteMany({});
        console.log('✅ Cleared existing coupons');

        // Insert sample coupons
        await Coupon.insertMany(sampleCoupons);
        console.log('✅ Sample coupons created:');
        sampleCoupons.forEach(c => {
            console.log(`   - ${c.code}: ₹${c.discount} off (Min order: ₹${c.minOrder})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding coupons:', error);
        process.exit(1);
    }
};

seedCoupons();
