import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartSidebar from './CartSidebar';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold text-dark">
                        Root & Sprout
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link to="/menu" className="text-gray-600 hover:text-primary transition-colors font-medium">Menu</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary transition-colors font-medium">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors font-medium">Contact</Link>
                        <Link to="/reservations" className="text-gray-600 hover:text-primary transition-colors font-medium">Reservations</Link>

                        <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                            {/* User Profile / Login */}
                            {user ? (
                                <Link to="/profile" className="flex items-center gap-2 hover:bg-stone-100 p-1.5 pr-3 rounded-full transition-all">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`;
                                        }}
                                        referrerPolicy="no-referrer"
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full border border-gray-200"
                                    />
                                    <span className="text-sm font-semibold text-dark truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                                </Link>
                            ) : (
                                <Link to="/login" className="text-dark font-medium hover:text-primary transition-colors">
                                    Login
                                </Link>
                            )}

                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="bg-primary hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg relative"
                            >
                                <ShoppingBag size={18} />
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Fixed to use state correctly */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-gray-600 relative"
                        >
                            <ShoppingBag size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button onClick={toggleMobileMenu} className="text-gray-600">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 absolute w-full"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4 shadow-lg">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">Home</Link>
                            <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">Menu</Link>
                            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">About</Link>
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">Contact</Link>
                            <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">Reservations</Link>

                            {user ? (
                                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-primary font-medium">
                                    My Profile ({user.name})
                                </Link>
                            ) : (
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-primary font-bold">
                                    Login / Signup
                                </Link>
                            )}

                            <button
                                onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                                className="w-full bg-primary text-white py-3 rounded-full font-medium mt-4 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={18} />
                                View Cart ({cartCount})
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>
            <CartSidebar />
        </>
    );
};

export default Navbar;
