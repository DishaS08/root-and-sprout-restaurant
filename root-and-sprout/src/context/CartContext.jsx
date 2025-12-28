import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderService, couponService } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
            return [];
        }
    });

    const [orders, setOrders] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    // Initial fetch of orders if user is logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchOrders();
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getMyOrders();
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Coupon Logic
    // Sync with backend seeds: WELCOME10, SAVE20, FESTIVE50
    const availableCoupons = [
        { code: 'WELCOME10', type: 'flat', value: 50, minOrder: 200, label: 'Get ₹50 OFF on orders above ₹200' },
        { code: 'SAVE20', type: 'flat', value: 100, minOrder: 500, label: 'Get ₹100 OFF on orders above ₹500' },
        { code: 'FESTIVE50', type: 'flat', value: 150, minOrder: 1000, label: 'Get ₹150 OFF on orders above ₹1000' }
    ];

    // Calculate Totals Helper
    const calculateTotals = () => {
        const subTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
        let discountAmount = 0;

        if (appliedCoupon) {
            // Note: Backend handles validation, but we estimate here for UI
            discountAmount = appliedCoupon.value;
            // If percentage logic needed in future, add checks here
        }

        const deliveryFee = 50;
        const total = Math.max(0, subTotal - discountAmount) + deliveryFee;

        return { subTotal, discountAmount, deliveryFee, finalTotal: total };
    };

    const { subTotal, discountAmount, deliveryFee, finalTotal } = calculateTotals();

    const applyCoupon = async (couponCode) => {
        try {
            const response = await couponService.validateCoupon(couponCode, subTotal);

            if (response.data.valid) {
                // Creating a coupon object based on backend response or matching local list
                const coupon = availableCoupons.find(c => c.code === couponCode) || {
                    code: couponCode,
                    value: response.data.discount,
                    type: 'flat', // Defaulting for now
                    label: 'Applied Coupon'
                };

                setAppliedCoupon(coupon);
                return { success: true };
            } else {
                setAppliedCoupon(null);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Error applying coupon';
            console.error("Coupon error details:", error.response); // Added detailed logging
            setAppliedCoupon(null);
            return { success: false, message: msg };
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, change) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(0, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setCartItems([]);
        setAppliedCoupon(null);
    };

    const placeOrder = async (orderDetails) => {
        try {
            if (!localStorage.getItem('token')) {
                return null;
            }

            const orderData = {
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: parseFloat(item.price),
                    quantity: item.quantity,
                    image: item.image
                })),
                subtotal: subTotal,
                tax: 0, // Assuming tax included or 0 for now
                deliveryFee: deliveryFee,
                discount: discountAmount,
                total: finalTotal,
                couponUsed: appliedCoupon ? appliedCoupon.code : null,
                paymentMethod: orderDetails.paymentMethod,
                deliveryAddress: orderDetails.deliveryAddress // Passed from CheckoutPage
            };

            const response = await orderService.createOrder(orderData);

            clearCart();
            fetchOrders(); // Refresh order list
            return response.data._id; // Return DB ID

        } catch (error) {
            console.error("Order failed", error);
            throw error;
        }
    };

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            placeOrder,
            orders,
            // Expose calculated values
            subTotal,
            discountAmount,
            finalTotal,
            appliedCoupon,
            applyCoupon,
            removeCoupon,
            availableCoupons,
            cartCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
