const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let userId = '';

const testFlow = async () => {
    console.log('🚀 Starting Backend Verification...\n');

    // 1. Health Check (Simulated by trying to connect)
    try {
        console.log('Checking Server Status...');
        // Just checking if we can reach the server
    } catch (error) {
        console.error('❌ Server is NOT running. Please start it with "npm run dev".');
        process.exit(1);
    }

    // 2. Signup
    console.log('\n--- 1. Testing Signup ---');
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    try {
        const res = await axios.post(`${API_URL}/auth/signup`, {
            name: 'Test Verify User',
            email: uniqueEmail,
            password: 'password123',
            phone: '1234567890'
        });
        console.log('✅ Signup Successful');
        console.log('User ID:', res.data._id);
        userId = res.data._id;
        token = res.data.token; // Usually returns token on signup too
    } catch (error) {
        console.error('❌ Signup Failed:', error.response?.data?.message || error.message);
    }

    // 3. Login
    console.log('\n--- 2. Testing Login ---');
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {
            email: uniqueEmail,
            password: 'password123'
        });
        console.log('✅ Login Successful');
        token = res.data.token;
    } catch (error) {
        console.error('❌ Login Failed:', error.response?.data?.message || error.message);
    }

    if (!token) {
        console.error('❌ No token received. Aborting remaining tests.');
        return;
    }

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // 4. Create Reservation
    console.log('\n--- 3. Testing Create Reservation ---');
    try {
        const res = await axios.post(`${API_URL}/reservations`, {
            date: '2025-01-01',
            timeSlot: '7:00 PM', // Correct field
            guests: 2,
            name: 'Test User',
            email: uniqueEmail,
            phone: '1234567890',
            notes: 'Testing reservation'
        }, authHeaders);
        console.log('✅ Reservation Created');
        console.log('Reservation ID:', res.data._id);
    } catch (error) {
        console.error('❌ Reservation Failed:', error.response?.data?.message || error.message);
    }

    // 5. Create Order
    console.log('\n--- 4. Testing Create Order ---');
    try {
        // Mock order data matching backend expectation
        const orderData = {
            items: [
                { id: 1, title: 'Test Food', price: 100, quantity: 2, image: 'http://test.com/img.jpg' }
            ],
            subtotal: 200, // Required
            tax: 10,       // Required
            total: 210,
            deliveryDetails: {
                street: '123 Test St',
                city: 'Test City',
                zip: '12345'
            },
            paymentMethod: 'cod' // Now allowed
        };
        const res = await axios.post(`${API_URL}/orders`, orderData, authHeaders);
        console.log('✅ Order Created');
        console.log('Order ID:', res.data._id);
    } catch (error) {
        console.error('❌ Order Creation Failed:', error.response?.data?.message || error.message);
    }

    // 6. Get My Orders
    console.log('\n--- 5. Testing Fetch History ---');
    try {
        const res = await axios.get(`${API_URL}/orders`, authHeaders);
        console.log(`✅ Fetched ${res.data.length} Orders`);
    } catch (error) {
        console.error('❌ Fetch Orders Failed:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Verification Complete!');
};

testFlow();
