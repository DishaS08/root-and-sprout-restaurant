import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import MenuItem from '../components/MenuItem';
import { Search, X, Mic } from 'lucide-react';
import { CUISINES, MENU_DATA } from '../data/menuData';

const MenuPage = () => {
    const [activeCuisine, setActiveCuisine] = useState('indian');
    const [activeCategory, setActiveCategory] = useState(MENU_DATA['indian'].categories[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startVoiceSearch = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchQuery(transcript);
            };

            recognition.start();
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

    const handleCuisineChange = (cuisineId) => {
        setActiveCuisine(cuisineId);
        setActiveCategory(MENU_DATA[cuisineId].categories[0].id);
        setSearchQuery('');
    };

    const allItems = useMemo(() => {
        const items = [];
        Object.values(MENU_DATA).forEach(cuisine => {
            Object.values(cuisine.items).forEach(categoryItems => {
                items.push(...categoryItems);
            });
        });
        return items;
    }, []);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return allItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allItems]);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="bg-stone-900 text-white py-20 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-serif mb-4"
                >
                    Our Menu
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-stone-300 max-w-2xl mx-auto text-lg"
                >
                    A wide variety of delicious cuisines to satisfy every craving.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 flex flex-col md:flex-row gap-8">
                {!searchQuery && (
                    <div className="md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                            <h3 className="text-lg font-serif font-bold text-dark mb-4 px-2 hidden md:block">Cuisines</h3>
                            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                                {CUISINES.map(cuisine => (
                                    <button
                                        key={cuisine.id}
                                        onClick={() => handleCuisineChange(cuisine.id)}
                                        className={`px-4 py-3 rounded-lg text-left font-medium transition-all whitespace-nowrap flex-1 md:flex-none ${activeCuisine === cuisine.id
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-600 hover:bg-stone-50'
                                            }`}
                                    >
                                        {cuisine.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-grow">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 flex items-center gap-2 sticky top-4 z-30">
                        <Search size={20} className="text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder={isListening ? "Listening..." : "Search dishes..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 py-2 outline-none text-dark placeholder-gray-400"
                        />
                        <button
                            onClick={startVoiceSearch}
                            className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-gray-100 text-gray-500'}`}
                        >
                            <Mic size={18} />
                        </button>
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {searchQuery ? (
                        <div className="bg-white rounded-xl p-6 min-h-[50vh]">
                            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                                <Search size={24} className="text-primary" />
                                Search Results for "{searchQuery}"
                            </h2>
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                                    {searchResults.map((item) => (
                                        <MenuItem key={item.id} {...item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    <p className="text-xl">No dishes found matching your search.</p>
                                    <button onClick={() => setSearchQuery('')} className="text-primary font-bold mt-4 hover:underline">Clear Search</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="bg-white/80 backdrop-blur-sm sticky top-20 z-20 py-4 mb-4 border-b border-gray-100 flex gap-4 overflow-x-auto no-scrollbar">
                                {MENU_DATA[activeCuisine].categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${activeCategory === category.id
                                            ? 'border-primary bg-green-50 text-primary'
                                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-4">
                                {MENU_DATA[activeCuisine].items[activeCategory].map((item, index) => (
                                    <MenuItem key={item.id} {...item} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-16 text-center text-gray-500 text-sm italic">
                <p>V - Vegetarian | VG - Vegan | GF - Gluten Free</p>
                <p className="mt-2 text-xs">Images are for representation purposes only.</p>
            </div>
        </div>
    );
};

export default MenuPage;
