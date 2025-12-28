import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
    {
        id: 1,
        name: "Paneer Tikka",
        desc: "Chunks of fresh cottage cheese marinated in spiced yogurt and grilled to perfection.",
        price: "₹249",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2034&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Veg Manchurian",
        desc: "Vegetable dumplings tossed in a savory garlic and soya sauce.",
        price: "₹229",
        image: "/img/menu/veg-manchurian.png"
    },
    {
        id: 3,
        name: "Gulab Jamun",
        desc: "Fried milk solids soaked in saffron sugar syrup, served warm.",
        price: "₹99",
        image: "/img/menu/gulab-jamun.png"
    }
];

const SimpleMenu = () => {
    return (
        <section id="menu" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-lg">Our Favorites</span>
                    <h2 className="text-4xl font-bold text-dark mt-2 mb-4">Simply Delicious</h2>
                    <p className="text-gray-600">Thoughtfully curated dishes to energize your day.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menuItems.map((item) => (
                        <div key={item.id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="h-48 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-dark">{item.name}</h3>
                                <span className="text-primary font-bold text-lg">{item.price}</span>
                            </div>

                            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            <Link to="/menu" className="w-full py-3 rounded-xl border border-gray-200 text-dark font-medium hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2">
                                <Plus size={18} />
                                View Item
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/menu" className="text-primary font-bold hover:underline underline-offset-4">View Complete Menu</Link>
                </div>
            </div>
        </section>
    );
};

export default SimpleMenu;
