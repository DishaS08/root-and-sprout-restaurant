# 🌱 Root & Sprout Restaurant

A full-stack restaurant app with online ordering, table reservations, and AI chatbot.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## ✨ Features

- 🍽️ **Online Ordering** - Browse menu, add to cart, apply coupons
- 📅 **Reservations** - Book & manage table reservations
- 🔐 **Auth** - Email/password + Google OAuth login
- 🤖 **AI Chatbot** - Powered by Google Gemini
- ⭐ **Reviews** - Customer ratings & reviews

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/DishaS08/root-and-sprout.git
cd root-and-sprout
npm install
cd server && npm install && cd ..

# Configure server/.env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret

# Run
cd server && npm run dev  # Backend → localhost:5000
npm run dev               # Frontend → localhost:5173
```

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express, MongoDB, JWT  
**AI:** Google Gemini

## 📁 Structure

```
├── src/           # React frontend
│   ├── components/
│   ├── pages/
│   └── context/
├── server/        # Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
```

🌐 Live Project
Check out the live app: https://root-and-sprout-restaurant.vercel.app


