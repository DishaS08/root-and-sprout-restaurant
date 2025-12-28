import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ id, title, description, price, tags = [], image }) => {
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart({ id, title, price, image });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors border-b border-gray-100 last:border-0 group"
        >
            {image && (
                <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden relative">
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
            )}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-xl font-serif font-medium text-dark">{title}</h3>
                        <span className="text-primary font-semibold text-lg">₹{price}</span>
                    </div>
                    <p className="text-gray-600 mb-2 leading-relaxed text-sm md:text-base">{description}</p>
                    <div className="flex gap-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full font-medium tracking-wide uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-full transition-all"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuItem;
