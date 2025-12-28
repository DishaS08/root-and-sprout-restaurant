import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, ChevronLeft, Banknote, Tag } from 'lucide-react'; // Added Tag
import OrderTracker from '../components/OrderTracker';


const CheckoutPage = () => {
    const {
        cartItems,
        subTotal,
        finalTotal,
        discountAmount,
        appliedCoupon,
        availableCoupons,
        applyCoupon,
        removeCoupon,
        placeOrder
    } = useCart();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'

    const [deliveryDetails, setDeliveryDetails] = useState({
        firstName: '', lastName: '', street: '', city: '', zipCode: '', phone: ''
    });
    const [couponError, setCouponError] = useState(null);

    const handleInputChange = (e) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (isProcessing) return;

        setIsProcessing(true);
        try {
            const orderId = await placeOrder({
                paymentMethod,
                deliveryAddress: deliveryDetails
            });

            if (orderId) {
                setIsOrderPlaced(true);
            }
        } catch (error) {
            console.error(error);
            // Error handled in context by toast
        } finally {
            setIsProcessing(false);
        }
    };

    if (isOrderPlaced) {
        return <OrderTracker />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-serif text-dark mb-4">Your cart is empty</h1>
                <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition-all">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="max-w-6xl mx-auto">
                <Link to="/menu" className="inline-flex items-center text-gray-500 hover:text-dark mb-8">
                    <ChevronLeft size={20} /> Back to Menu
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                            <h2 className="text-2xl font-serif text-dark mb-6 flex items-center gap-3">
                                <Truck size={24} /> Delivery Details
                            </h2>
                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" name="firstName" placeholder="First Name" required onChange={handleInputChange} className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                <input type="text" name="lastName" placeholder="Last Name" required onChange={handleInputChange} className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                <div className="md:col-span-2">
                                    <input type="text" name="street" placeholder="Street Address" required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <input type="text" name="city" placeholder="City" required onChange={handleInputChange} className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                <input type="text" name="zipCode" placeholder="Zip Code" required onChange={handleInputChange} className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                <div className="md:col-span-2">
                                    <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-serif text-dark mb-6 flex items-center gap-3">
                                <CreditCard size={24} /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                {/* Credit Card Option */}
                                <div
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-green-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-dark flex items-center gap-2">
                                            <CreditCard size={18} /> Credit / Debit Card
                                        </p>
                                    </div>
                                </div>

                                {/* COD Option */}
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-green-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
                                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-dark flex items-center gap-2">
                                            <Banknote size={18} /> Cash on Delivery
                                        </p>
                                        <p className="text-xs text-gray-500">Pay accurately with cash upon delivery.</p>
                                    </div>
                                </div>

                                {/* Card Details Form - Only show if Card is selected */}
                                {paymentMethod === 'card' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="grid grid-cols-2 gap-4 mt-6 pt-2 border-t border-gray-100"
                                    >
                                        <input type="text" placeholder="Card Number" required className="col-span-2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                        <input type="text" placeholder="Expiration (MM/YY)" required className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                        <input type="text" placeholder="CVC" required className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-28">
                            <h2 className="text-2xl font-serif text-dark mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-dark">{item.quantity}x {item.title}</p>
                                            <p className="text-sm text-gray-500">₹{item.price}</p>
                                        </div>
                                        <p className="font-medium">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Section */}
                            <div className="border-t border-gray-100 pt-6 mt-6">
                                <h3 className="text-lg font-serif text-dark mb-4 flex items-center gap-2">
                                    <Tag size={20} /> Apply Coupon
                                </h3>

                                <div className="space-y-3">


                                    {availableCoupons.map(coupon => {
                                        const isApplicable = subTotal >= coupon.minOrder;
                                        return (
                                            <div key={coupon.code} className="flex flex-col">
                                                <div
                                                    className={`p-3 border rounded-xl flex justify-between items-center transition-all ${appliedCoupon?.code === coupon.code
                                                        ? 'border-primary bg-green-50'
                                                        : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-dark">{coupon.code}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">{coupon.label}</p>
                                                    </div>
                                                    {appliedCoupon?.code === coupon.code ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-primary text-sm font-bold">APPLIED</span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeCoupon();
                                                                    setCouponError(null);
                                                                }}
                                                                className="text-red-500 text-xs font-bold hover:underline"
                                                            >
                                                                REMOVE
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                if (isApplicable) {
                                                                    applyCoupon(coupon.code);
                                                                    setCouponError(null);
                                                                } else {
                                                                    setCouponError(coupon.code);
                                                                }
                                                            }}
                                                            className="text-sm font-bold text-primary hover:underline"
                                                        >
                                                            APPLY
                                                        </button>
                                                    )}
                                                </div>
                                                {couponError === coupon.code && !isApplicable && (
                                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                                        Not applicable
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-2 mt-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>₹50.00</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount ({appliedCoupon?.code})</span>
                                        <span>- ₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-serif text-xl font-bold text-dark pt-4 border-t border-gray-100 mt-4">
                                    <span>Total</span>
                                    <span>₹{finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full bg-stone-900 text-white py-4 rounded-xl font-bold mt-8 shadow-lg transition-all ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-black hover:shadow-xl'}`}
                            >
                                {isProcessing
                                    ? 'Processing...'
                                    : (paymentMethod === 'cod' ? 'Place Order (COD)' : 'Pay & Place Order')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
