const axios = require('axios');

const testGoogleLogin = async () => {
    try {
        console.log("Attempting Google Login request...");
        const response = await axios.post('http://localhost:5000/api/auth/google', {
            email: 'test_google_user_' + Date.now() + '@example.com', // Unique email
            name: 'Test Google User',
            avatar: 'http://example.com/avatar.jpg',
            googleId: '1234567890'
        });
        console.log('✅ Success:', response.data);
    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
    }
};

testGoogleLogin();
