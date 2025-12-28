const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
// User needs to add GEMINI_API_KEY to .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({
                message: "I'm currently undergoing maintenance (API Key missing). Please tell the developer to check the logs!"
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        You are the friendly and helpful AI assistant for "Root & Sprout", a modern restaurant specializing in Indian, Chinese, and Italian cuisine.
        
        Restaurant Details:
        - Name: Root & Sprout
        - Hours: Mon-Fri (12pm-11pm), Sat-Sun (10am-11pm)
        - Address: 123 Garden Lane, Food District
        - Cuisine: Indian, Chinese, Italian
        - Key Dishes: Spicy Chicken Burger, Margherita Pizza, Manchurian, Hakka Noodles.
        - Services: Dine-in, Takeaway, Online Ordering via this website.
        
        Your Tone:
        - Warm, welcoming, and emojis are encouraged 😋🍕.
        - Keep answers concise (max 2-3 sentences).
        - If asked about the menu, recommend our popular dishes.
        - If asked about reservations, direct them to the "Reservations" page.
        
        User Query: ${message}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ message: "I'm having a bit of a brain freeze. Can you ask me that again? 🥶" });
    }
});

module.exports = router;
