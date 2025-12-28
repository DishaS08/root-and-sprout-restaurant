import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Header */}
            <div className="bg-stone-50 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-dark mb-4">Get in Touch</h1>
                <p className="text-gray-600 max-w-xl mx-auto px-4">
                    Have a question or feedback? We'd love to hear from you.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary mb-4">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-dark">Visit Us</h3>
                                <p className="text-gray-600">
                                    123 Garden Lane,<br />
                                    Food District, FD 10101
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary mb-4">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-dark">Opening Hours</h3>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold text-dark">Mon-Fri:</span> 12pm - 11pm<br />
                                    <span className="font-semibold text-dark">Sat-Sun:</span> 10am - 11pm
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary mb-4">
                                    <Phone size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-dark">Call Us</h3>
                                <p className="text-gray-600">
                                    +1 (555) 123-4567<br />
                                    +1 (555) 987-6543
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary mb-4">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-dark">Email Us</h3>
                                <p className="text-gray-600">
                                    hello@rootandsprout.com<br />
                                    events@rootandsprout.com
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="rounded-2xl overflow-hidden shadow-lg h-80 bg-stone-200 relative">
                            <iframe
                                title="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459392!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1626356716000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                    >
                        <h2 className="text-2xl font-serif text-dark mb-6">Send a Message</h2>
                        <form className="space-y-6" onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = {
                                name: formData.get('name'),
                                email: formData.get('email'),
                                subject: formData.get('subject'),
                                message: formData.get('message')
                            };

                            try {
                                const { feedbackService } = await import('../services/api');
                                const toast = (await import('react-hot-toast')).default;
                                await feedbackService.submitFeedback(data);
                                toast.success('Message sent! We will get back to you soon.');
                                e.target.reset();
                            } catch (error) {
                                const toast = (await import('react-hot-toast')).default;
                                toast.error('Failed to send message. Please try again.');
                                console.error(error);
                            }
                        }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input name="name" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input name="email" type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select name="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                                    <option>General Inquiry</option>
                                    <option>Private Event</option>
                                    <option>Press & Media</option>
                                    <option>Careers</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea name="message" required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-stone-900 hover:bg-black text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
