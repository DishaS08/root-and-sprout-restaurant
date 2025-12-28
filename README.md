# 🌱 Root & Sprout Restaurant

**Eat Real. Taste Comfort.**

Root & Sprout is a **full-stack restaurant web application** featuring online food ordering, table reservations, user authentication, and an AI-powered chatbot for customer assistance.

---

## 🚀 Tech Stack

**Frontend**
- React 19, Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Axios, React Hot Toast

**Backend**
- Node.js, Express.js
- MongoDB, Mongoose
- JWT Authentication
- Google OAuth
- Google Gemini AI (Chatbot)
- Nodemailer

---

## ✨ Key Features

- 🍽️ **Online Ordering** – Cart, coupons, order tracking & history  
- 📅 **Table Reservations** – Book, view, cancel reservations  
- 👤 **Authentication** – Email/password + Google OAuth  
- 💬 **AI Chatbot** – Menu help & restaurant queries (Gemini AI)  
- ⭐ **Reviews & Ratings** – Customer feedback system  
- 🎨 **Modern UI** – Responsive design, animations, notifications  

---

## 📁 Project Structure

root-and-sprout/
├── src/        # Frontend (React)
├── server/     # Backend (Node + Express)
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js




---

## 🛠️ Setup & Run

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
git clone https://github.com/DishaS08/root-and-sprout-restaurant.git
cd root-and-sprout
npm install
cd server && npm install && cd ..
Environment Variables (.env file inside server/)
bash
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/root-and-sprout
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GEMINI_API_KEY=your-gemini-api-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
Run Project
bash
Copy code
# Backend (Terminal 1)
cd server
npm run dev

# Frontend (Terminal 2)
npm run dev
Frontend: http://localhost:5173

Backend API: http://localhost:5000/api

📡 Core API Modules
Authentication (register/login/Google OAuth)

Orders (create/get)

Reservations (book/view/cancel)

Coupons (validate)

Reviews (submit/get)

AI Chat (send message)

📄 Available Scripts
Frontend

bash
Copy code
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
Backend

bash
Copy code
cd server
npm run dev      # Start with nodemon
npm start        # Start production server
👩‍💻 Author
Disha Suryawanshi
Computer Engineering Student | Full-Stack Developer
GitHub: @DishaS08
LinkedIn: Your LinkedIn

⭐ Star this repository if you find it useful!

pgsql
Copy code

✅ All code blocks now **start with ```bash** and properly **end with ```**.  

This is fully copy-paste ready for your GitHub README.  

If you want, I can also **add a small “Live Demo” and screenshot section** to make it look more professional on GitHub without making it too long. Do you want me to do that?






