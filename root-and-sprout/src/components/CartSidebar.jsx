import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_DATA } from '../data/menuData';

const CartSidebar = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, subTotal, addToCart } = useCart();

    // Flatten all items from MENU_DATA for easy access
    const allItems = useMemo(() => {
        const items = [];
        Object.values(MENU_DATA).forEach(cuisine => {
            Object.values(cuisine.items).forEach(categoryItems => {
                items.push(...categoryItems);
            });
        });
        return items;
    }, []);

    // Get Recommendations based on cart items
    const recommendations = useMemo(() => {
        if (cartItems.length === 0) return [];

        const cartIds = new Set(cartItems.map(item => item.id));
        const availableItems = allItems.filter(item => !cartIds.has(item.id));

        // Simple random recommendation logic
        // In a real app, this would be based on category matching (e.g., Main -> Drink)
        const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    }, [cartItems, allItems]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h2 className="text-2xl font-serif font-bold text-dark flex items-center gap-2">
                                <ShoppingBag size={24} /> Your Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                                    <ShoppingBag size={64} className="opacity-20" />
                                    <p className="text-lg">Your cart is currently empty.</p>
                                    <Link
                                        to="/menu"
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-primary font-bold hover:underline"
                                    >
                                        Start Ordering
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                layout
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                className="flex gap-4"
                                            >
                                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-bold text-dark line-clamp-1">{item.title}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-primary font-bold text-sm mb-3">₹{item.price}</p>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="font-semibold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Recommendations Section */}
                                    {recommendations.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Sparkles size={16} className="text-yellow-500" /> Recommended for You
                                            </h3>
                                            <div className="space-y-3">
                                                {recommendations.map(item => (
                                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                                                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-sm text-dark truncate">{item.title}</p>
                                                            <p className="text-xs text-gray-500">₹{item.price}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="text-xs font-bold bg-white border border-primary text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all uppercase"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-xl font-serif font-bold text-dark">
                                        <span>Total</span>
                                        <span>₹{subTotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center">Shipping & taxes calculated at checkout</p>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full bg-primary hover:bg-green-600 text-white text-center py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout <ArrowRight size={20} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
