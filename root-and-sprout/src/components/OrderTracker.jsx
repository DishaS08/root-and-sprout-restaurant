import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChefHat, Truck, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const STEPS = [
    { id: 1, label: "Order Confirmed", icon: Check, delay: 0 },
    { id: 2, label: "Preparing", icon: ChefHat, delay: 2000 },
    { id: 3, label: "Out for Delivery", icon: Truck, delay: 5000 },
    { id: 4, label: "Delivered", icon: MapPin, delay: 8000 }
];

const OrderTracker = () => {
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        // Simulate progress
        const timers = STEPS.slice(1).map(step =>
            setTimeout(() => {
                setCurrentStep(step.id);
                if (step.id === 4) {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }, step.delay)
        );

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-serif text-dark mb-2">Order Status</h1>
                    <p className="text-gray-500">Order #883492 • Live Tracking</p>
                </div>

                <div className="relative flex justify-between items-center mb-16">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full"></div>

                    {/* Active Progress Bar */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-green-500 -z-0 -translate-y-1/2 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />

                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep >= step.id;
                        const isCurrent = currentStep === step.id;

                        return (
                            <div key={step.id} className="relative flex flex-col items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        backgroundColor: isActive ? '#22c55e' : '#ffffff',
                                        borderColor: isActive ? '#22c55e' : '#e5e7eb',
                                        scale: isCurrent ? 1.2 : 1
                                    }}
                                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                >
                                    <Icon size={20} />
                                </motion.div>

                                <div className="absolute -bottom-10 w-32 text-center">
                                    <p className={`text-sm font-medium ${isActive ? 'text-dark' : 'text-gray-400'}`}>
                                        {step.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center bg-green-50 p-6 rounded-2xl mb-8">
                    <AnimateMessage step={currentStep} />
                </div>

                <div className="flex justify-center">
                    <Link to="/menu" className="text-primary font-bold hover:underline">
                        Order More
                    </Link>
                </div>
            </div>
        </div>
    );
};

const AnimateMessage = ({ step }) => {
    const messages = {
        1: "We've received your order! Sending it to the kitchen.",
        2: "Our chefs are cooking up a storm! 🍳",
        3: "Your food is on the way! Watch out for our rider. 🛵",
        4: "Arrived! Enjoy your meal. 😋"
    };

    return (
        <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-green-800 font-medium"
        >
            {messages[step]}
        </motion.p>
    );
};

export default OrderTracker;
