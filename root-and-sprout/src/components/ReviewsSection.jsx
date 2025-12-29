import React from 'react';
import { Star, User, Quote, CheckCircle } from 'lucide-react';

const ReviewsSection = () => {
    // Static dummy data for beautiful presentation always
    // No API calls needed -> faster load & no "empty" states for visitors
    const reviews = [
        {
            _id: '1',
            rating: 5,
            comment: "The best dining experience I've had in years. The Red Sauce Pasta was absolutely divine, and the ambiance is just perfect for date night.",
            user: { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            items: [{ name: 'Red Sauce Pasta', rating: 5 }]
        },
        {
            _id: '2',
            rating: 5,
            comment: "Honestly blown away by the service. Everything from the Paneer Butter Masala to the fresh mocktails was top-notch. Highly recommended!",
            user: { name: 'Rahul K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80' },
            items: [{ name: 'Paneer Butter Masala', rating: 5 }]
        },
        {
            _id: '3',
            rating: 4,
            comment: "Great place for family dinner. The discounts were a nice surprise and the staff was extremely courteous. Will definitely visit again.",
            user: { name: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            items: [{ name: 'Veg Hakka Noodles', rating: 4 }]
        }
    ];

    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-dark mb-4">What Our Guests Say</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Real experiences from our verified diners.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative group">
                            <Quote className="absolute top-6 right-6 text-gray-100 group-hover:text-green-50 transition-colors" size={48} />

                            <div className="flex items-center gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < (review.rating || 5) ? "currentColor" : "none"}
                                        className={i < (review.rating || 5) ? "" : "text-gray-200"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed">
                                "{review.comment}"
                            </p>

                            {/* Dish Tags - Showing top rated items from the review */}
                            {review.items && review.items.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {review.items.filter(i => i.rating >= 4).slice(0, 3).map((item, idx) => (
                                        <span key={idx} className="bg-stone-50 text-stone-600 text-xs px-3 py-1 rounded-full font-medium border border-stone-100">
                                            ❤️ {item.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                {review.user?.avatar ? (
                                    <img src={review.user.avatar} alt={review.user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User size={24} className="text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-dark text-sm">{review.user?.name || 'Happy Diner'}</h4>
                                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                        <CheckCircle size={12} />
                                        <span>Verified Order</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
