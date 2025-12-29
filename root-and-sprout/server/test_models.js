const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log(`Using Key: ...${process.env.GEMINI_API_KEY.slice(-4)}`);

        // Testing common model variations
        const models = [
            "gemini-1.5-flash",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        for (const modelName of models) {
            process.stdout.write(`Testing model: ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ Success!`);
                return;
            } catch (e) {
                console.log(`❌ Failed: ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Script Error:", error);
    }
}

listModels();
