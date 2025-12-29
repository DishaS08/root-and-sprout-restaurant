import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SimpleMenu from './components/SimpleMenu';
import Footer from './components/Footer';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ReviewsSection from './components/ReviewsSection';


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white font-sans text-dark">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <SimpleMenu />
              <ReviewsSection />
            </>
          } />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />

      </div>
    </AuthProvider>
  );
}

export default App;
