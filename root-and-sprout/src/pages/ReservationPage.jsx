import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Check, LogIn } from 'lucide-react';
import { reservationService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ReservationPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Initialize form with user data if available
    const [formData, setFormData] = useState({
        date: '',
        timeSlot: '',
        guests: 2,
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        specialRequests: '' // Corrected from notes to match backend
    });

    // Update form when user loads/changes
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [user]);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await reservationService.createReservation(formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Reservation failed:", error);
            const msg = error.response?.data?.message || "Failed to make reservation";
            // Error handling quietly or via inline message if needed
        }
    };

    // Generate time slots
    const timeSlots = [];
    // Lunch: 12:00 PM - 3:00 PM
    for (let i = 12; i <= 15; i++) {
        timeSlots.push(`${i > 12 ? i - 12 : i}:00 PM`);
        if (i !== 15) timeSlots.push(`${i > 12 ? i - 12 : i}:30 PM`);
    }
    // Dinner: 6:00 PM - 11:00 PM
    for (let i = 18; i <= 23; i++) {
        const hour = i > 12 ? i - 12 : i;
        timeSlots.push(`${hour}:00 PM`);
        if (i !== 23) timeSlots.push(`${hour}:30 PM`);
    }

    return (
        <div className="min-h-screen bg-stone-50 py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Image Side */}
                <div className="md:w-1/3 bg-stone-900 relative hidden md:block">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                    <div className="relative z-10 p-8 text-white h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-serif mb-2">Book a Table</h2>
                            <p className="text-stone-300 text-sm">Experience the finest seasonal dining.</p>
                        </div>
                        <div className="space-y-4 text-sm text-stone-300">
                            <p className="font-bold text-white mb-2">Open Daily</p>
                            <div>
                                <p className="text-primary font-bold">Lunch</p>
                                <p>12:00 PM - 3:00 PM</p>
                            </div>
                            <div>
                                <p className="text-primary font-bold">Dinner</p>
                                <p>6:00 PM - 11:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-2/3 p-8 md:p-12">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!user && (
                                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                    <LogIn size={16} />
                                    <span>Please <Link to="/login" className="font-bold underline">login</Link> to make a reservation.</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Calendar size={16} /> Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        onChange={handleChange}
                                        value={formData.date}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Clock size={16} /> Time
                                    </label>
                                    <select
                                        name="timeSlot"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        onChange={handleChange}
                                        value={formData.timeSlot}
                                    >
                                        <option value="">Select Time</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Users size={16} /> Guests
                                </label>
                                <div className="flex gap-4">
                                    {[2, 3, 4, 5, 6, 8].map(num => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, guests: num }))}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${formData.guests === num
                                                ? 'bg-primary text-white border-primary'
                                                : 'border-gray-300 text-gray-600 hover:border-primary'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <span className="self-center text-sm text-gray-500">For larger parties please contact us.</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        onChange={handleChange}
                                        value={formData.phone}
                                    />
                                </div>
                                <textarea
                                    name="specialRequests"
                                    placeholder="Special requests or dietary requirements (optional)"
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                    onChange={handleChange}
                                    value={formData.specialRequests}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!user}
                            >
                                {user ? 'Confirm Reservation' : 'Login to Reserve'}
                            </button>
                        </form>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <Check size={40} />
                            </div>
                            <h3 className="text-3xl font-serif text-dark mb-4">Reservation Confirmed!</h3>
                            <p className="text-gray-600 mb-8 max-w-sm">
                                Thank you, {formData.name}. We look forward to welcoming you on {formData.date} at {formData.timeSlot}.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-primary font-medium hover:underline"
                            >
                                Make another reservation
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ReservationPage;
