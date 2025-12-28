import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[40vh] bg-stone-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* We'll add a real image here later */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-20 text-center px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">Our Story</h1>
                    <p className="text-xl text-stone-200 max-w-2xl mx-auto font-light">
                        Cultivating flavors, honoring traditions.
                    </p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif text-dark mb-6">From The Ground Up</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Root & Sprout began with a simple idea: that good food starts with the soil.
                            Established in 2023, we set out to create a dining experience that bridges the gap between
                            the farm and the table.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Our philosophy is rooted in sustainability and seasonality. We work directly with local
                            farmers who share our commitment to ethical practices. Every dish tells a story of the
                            region, the season, and the hands that grew the ingredients.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mt-12">
                            <div>
                                <h4 className="text-4xl font-serif text-primary mb-2">25+</h4>
                                <p className="text-gray-500 text-sm">Local Farm Partners</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-serif text-primary mb-2">100%</h4>
                                <p className="text-gray-500 text-sm">Premium Ingredients</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                        <img
                            src="/img/about-menu-display.png"
                            alt="Farm-to-table Indian cuisine spread"
                            className="w-full h-full object-cover block"
                        />
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-stone-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif text-dark mb-4">Meet The Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The passionate individuals behind every dish and service.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Elena Rossi", role: "Head Chef", img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop" },
                            { name: "Marcus Chen", role: "Sous Chef", img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=1887&auto=format&fit=crop" },
                            { name: "Sarah Miller", role: "General Manager", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="h-80 rounded-lg overflow-hidden mb-6">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h3 className="text-xl font-serif text-dark text-center mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-medium text-center uppercase tracking-wider">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
