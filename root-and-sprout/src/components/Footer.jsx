import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold tracking-tight mb-6">
                            Root <span className="text-primary">&</span> Sprout
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Serving you the best flavors with fresh ingredients and traditional recipes.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#menu" className="hover:text-primary transition-colors">Our Menu</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Reservations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>123 Food Street, <br />Tasty City, FD 90210</li>
                            <li>hello@rootandsprout.com</li>
                            <li>(555) 123-4567</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for foodie tips and offers.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="bg-white/10 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-primary text-sm" />
                            <button className="bg-primary px-4 py-2 rounded-r-lg font-medium hover:bg-green-600 transition-colors">OK</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2025 Root & Sprout. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
