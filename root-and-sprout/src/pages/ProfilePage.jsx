import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Package, MapPin, Ticket, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

import { reservationService } from '../services/api';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Coupon code ${code} copied!`);
    };

    const [reservations, setReservations] = React.useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await reservationService.getMyReservations();
                setReservations(response.data);
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            }
        };
        fetchReservations();
    }, []);

    const handleCancelReservation = async (id) => {
        try {
            await reservationService.cancelReservation(id);
            const updatedReservations = reservations.filter(r => r._id !== id);
            setReservations(updatedReservations);
            toast.success('Reservation cancelled');
        } catch (error) {
            console.error("Failed to cancel reservation", error);
            toast.error("Failed to cancel reservation");
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`;
                        }}
                        referrerPolicy="no-referrer"
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-stone-100 shadow-sm"
                    />
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-serif text-dark mb-1">Hello, {user.name}!</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="flex items-center gap-2 text-red-500 font-medium hover:bg-red-50 px-4 py-2 rounded-full transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* My Orders Card */}
                    <Link to="/orders" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Package size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-dark mb-2">My Orders</h2>
                        <p className="text-gray-500">View your order history and track active orders.</p>
                    </Link>

                    {/* My Reservations Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                <Ticket size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-dark">Reservations</h2>
                                <p className="text-xs text-gray-500">{reservations.length} upcoming</p>
                            </div>
                        </div>

                        {reservations.length > 0 ? (
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {reservations.map(res => (
                                    <div key={res._id} className="p-3 bg-stone-50 rounded-xl flex justify-between items-center text-sm border border-stone-100">
                                        <div>
                                            <p className="font-bold text-dark">{new Date(res.date).toLocaleDateString()}</p>
                                            <p className="text-gray-500">{res.timeSlot} • {res.guests} Guests</p>
                                            <span className={`text-xs font-bold ${res.status === 'confirmed' ? 'text-green-600' : 'text-gray-500'}`}>
                                                {res.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleCancelReservation(res._id)}
                                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg text-xs font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm mt-2">No active reservations.</p>
                        )}
                    </div>

                    {/* Saved Addresses */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-dark mb-2">Saved Addresses</h2>
                        <p className="text-gray-500">Manage your delivery locations.</p>
                    </div>
                </div>

                {/* Discount Coupons */}
                <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <Ticket size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-dark">Available Coupons</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Coupon 1 */}
                        <div className="border border-dashed border-primary/40 bg-green-50/50 p-4 rounded-xl flex justify-between items-center group">
                            <div>
                                <p className="font-bold text-dark text-lg">WELCOME50</p>
                                <p className="text-sm text-gray-500">Get 50% off your first order</p>
                            </div>
                            <button
                                onClick={() => handleCopyCoupon('WELCOME50')}
                                className="p-2 bg-white text-primary rounded-lg shadow-sm hover:scale-105 transition-all active:scale-95"
                            >
                                <Copy size={18} />
                            </button>
                        </div>

                        {/* Coupon 2 */}
                        <div className="border border-dashed border-orange-300 bg-orange-50/50 p-4 rounded-xl flex justify-between items-center group">
                            <div>
                                <p className="font-bold text-dark text-lg">TASTY20</p>
                                <p className="text-sm text-gray-500">Flat 20% off on Order &gt; ₹500</p>
                            </div>
                            <button
                                onClick={() => handleCopyCoupon('TASTY20')}
                                className="p-2 bg-white text-orange-500 rounded-lg shadow-sm hover:scale-105 transition-all active:scale-95"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
