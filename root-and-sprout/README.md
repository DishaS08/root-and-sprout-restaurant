<p align="center">
  <img src="https://img.icons8.com/fluency/96/restaurant.png" alt="Root & Sprout Logo" width="80"/>
</p>

<h1 align="center">🌱 Root & Sprout Restaurant</h1>

<p align="center">
  <strong>A modern full-stack restaurant web application featuring online ordering, table reservations, and AI-powered chatbot support.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Google_AI-Gemini-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI"/>
</p>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🍽️ Online Ordering
- Browse 7 cuisine categories
- Smart cart with quantity management
- Discount coupons & promo codes
- Real-time order tracking
- Complete order history

</td>
<td width="50%">

### 📅 Table Reservations
- Book tables for any date/time
- Manage existing reservations
- Easy cancellation
- Automatic slot availability

</td>
</tr>
<tr>
<td width="50%">

### 🔐 User Authentication
- Email/password registration
- **Google OAuth** one-click login
- JWT secure sessions
- Profile with avatar support

</td>
<td width="50%">

### 🤖 AI Chatbot
- Powered by **Google Gemini**
- Menu recommendations
- Order assistance
- 24/7 instant support

</td>
</tr>
</table>

### Additional Features
- ⭐ **Customer Reviews & Ratings** - Social proof with star ratings
- 🎨 **Modern UI/UX** - Responsive design with Framer Motion animations
- 📱 **Mobile-First** - Works seamlessly on all devices
- 🎉 **Celebration Effects** - Confetti on successful orders

---

## 🛠️ Tech Stack

<table>
<tr>
<th align="center">Frontend</th>
<th align="center">Backend</th>
<th align="center">DevOps</th>
</tr>
<tr>
<td valign="top">

- React 19
- Vite
- React Router 7
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast

</td>
<td valign="top">

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js
- Nodemailer
- Google Generative AI

</td>
<td valign="top">

- npm
- ESLint
- PostCSS
- Git

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js v18+   •   MongoDB   •   npm or yarn
```

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/DishaS08/root-and-sprout.git
cd root-and-sprout

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2️⃣ Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/root-and-sprout
JWT_SECRET=your-secret-key

# Optional
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GEMINI_API_KEY=your-gemini-api-key
```

### 3️⃣ Run the Application

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev
```

| Service | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:5173 |
| 🔌 Backend API | http://localhost:5000/api |

---

## 📁 Project Structure

```
root-and-sprout/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CartSidebar.jsx
│   │   ├── ChatBot.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── context/           # React Context (Auth)
│   ├── data/              # Static menu data
│   ├── pages/             # Route pages
│   │   ├── MenuPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ReservationPage.jsx
│   │   └── ...
│   ├── services/          # API service layer
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/            # DB configuration
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth middleware
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Reservation.js
│   │   └── ...
│   ├── routes/            # API routes
│   └── server.js
│
├── public/                # Static assets
├── package.json
└── vite.config.js
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/google` | Google OAuth |
| `GET` | `/api/auth/me` | Get current user |

### Orders
| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/orders` | Get user orders |
| `POST` | `/api/orders` | Create order |
| `GET` | `/api/orders/:id` | Get order by ID |

### Reservations
| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/reservations` | Get user reservations |
| `POST` | `/api/reservations` | Create reservation |
| `DELETE` | `/api/reservations/:id` | Cancel reservation |

### Other Endpoints
| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/coupons` | Available coupons |
| `POST` | `/api/coupons/validate` | Validate code |
| `GET` | `/api/reviews` | Get reviews |
| `POST` | `/api/chat` | AI chatbot |

---

## 🍴 Menu Categories

| Category | Highlights |
|:--------:|------------|
| 🇮🇳 Indian | Paneer Tikka, Butter Chicken, Biryani |
| 🥡 Chinese | Spring Rolls, Hakka Noodles, Manchurian |
| 🍔 Fast Food | Burgers, Pizza, Pasta |
| 🍮 Sweets | Gulab Jamun, Rasmalai, Cheesecake |
| 🍜 Soups | Tomato, Manchow, Hot & Sour |
| 🥗 Sides | Raita, Papad, Salads |
| 🥤 Beverages | Masala Chai, Lassi, Milkshakes |

---

## 📜 Scripts

```bash
# Frontend
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # ESLint

# Backend (from /server)
npm start         # Production
npm run dev       # Development with nodemon
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | JWT signing secret |
| `PORT` | ❌ | Server port (default: 5000) |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GEMINI_API_KEY` | ❌ | Gemini AI API key |
| `EMAIL_HOST` | ❌ | SMTP host |
| `EMAIL_USER` | ❌ | Email address |
| `EMAIL_PASS` | ❌ | Email app password |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👩‍💻 Author

<p align="center">
  <strong>Disha Suryawanshi</strong>
  <br><br>
  <a href="https://github.com/DishaS08">
    <img src="https://img.shields.io/badge/GitHub-DishaS08-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>

---

<p align="center">
  <strong>⭐ If you found this project helpful, please star the repository!</strong>
  <br><br>
  Made with ❤️ for food lovers everywhere
</p>
