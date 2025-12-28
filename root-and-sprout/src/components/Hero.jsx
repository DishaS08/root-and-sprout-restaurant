import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-accent/30 py-20 lg:py-28 min-h-screen flex items-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-primary font-medium text-sm">
                            <Leaf size={16} fill="currentColor" />
                            <span>Authentic & Fresh</span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl md:text-7xl font-serif font-medium text-dark leading-tight mb-6"
                        >
                            Eat <span className="text-primary italic">Real</span>.<br />
                            Taste <span className="text-secondary">Comfort</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 text-lg mb-10 max-w-md"
                        >
                            Indulge in our generous, authentic, and delicious meals crafted with love.
                            Experience the true taste of comfort food.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link to="/menu" className="bg-primary hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                Order Now <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="px-8 py-4 rounded-full font-bold text-lg text-dark hover:bg-stone-100 transition-all">
                                Our Story
                            </Link>
                        </motion.div>

                        <div className="pt-8 flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-dark">25+</p>
                                <p className="text-sm text-gray-500">Years of Service</p>
                            </div>
                            <div className="w-px h-12 bg-gray-300"></div>
                            <div>
                                <p className="text-3xl font-bold text-dark">100%</p>
                                <p className="text-sm text-gray-500">Authentic Taste</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop"
                                alt="Authentic Indian Thali"
                                className="w-full h-auto aspect-square object-cover rounded-full shadow-2xl border-8 border-white"
                            />

                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs"
                            >
                                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                                    ⭐
                                </div>
                                <div>
                                    <p className="font-bold text-dark">Top Rated</p>
                                    <p className="text-xs text-gray-500">Best Comfort Food 2025</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-10 right-10 w-full h-full bg-primary/20 rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
