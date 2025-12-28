import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, ChevronRight, Package, Star, X } from 'lucide-react';
import { reviewService } from '../services/api';

const OrdersPage = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { user } = useAuth(); // Assuming useAuth provides current user info
    const [reviewsMap, setReviewsMap] = React.useState({});

    // Review Modal State
    const [isReviewOpen, setIsReviewOpen] = React.useState(false);
    const [isViewMode, setIsViewMode] = React.useState(false); // New state for viewing mode
    const [itemRatings, setItemRatings] = React.useState({});
    const [comment, setComment] = React.useState('');
    const [selectedOrder, setSelectedOrder] = React.useState(null);

    React.useEffect(() => {
        const fetchReviewedOrders = async () => {
            if (user) {
                try {
                    const response = await reviewService.getMyReviews();
                    if (Array.isArray(response.data)) {
                        const map = {};
                        response.data.forEach(review => {
                            // Handle both populated object or direct ID for order
                            const orderId = typeof review.order === 'object' ? review.order._id : review.order;
                            map[orderId] = review;
                        });
                        setReviewsMap(map);
                    }
                } catch (error) {
                    console.error("Failed to fetch reviewed orders", error);
                }
            }
        };
        fetchReviewedOrders();
    }, [user, isReviewOpen]); // Re-fetch when review modal closes (succesful submission)

    const handleOpenReview = (order) => {
        setSelectedOrder(order);
        // Initialize all items with 5 stars
        const initialRatings = {};
        if (order.items) {
            order.items.forEach(item => {
                initialRatings[item._id || item.id || item.title] = 5;
            });
        }
        setItemRatings(initialRatings);
        setComment('');
        setIsViewMode(false);
        setIsReviewOpen(true);
    };

    const handleViewReview = (order, review) => {
        setSelectedOrder(order);
        // Populate ratings from the existing review
        const ratings = {};
        if (review.items) {
            review.items.forEach(item => {
                // We need to map review item names back to the rating
                // Since we stored name in review item, we can use that as key or try to match
                // For simplicity in display, we might just iterate the review items directly in the modal
                // But to be consistent with state:
                ratings[item.name] = item.rating;
            });
        }
        setItemRatings(ratings);
        setComment(review.comment || '');
        setIsViewMode(true);
        setIsReviewOpen(true);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const itemsPayload = selectedOrder.items.map(item => ({
                name: item.title,
                rating: itemRatings[item._id || item.id || item.title] || 5
            }));

            await reviewService.addReview({
                orderId: selectedOrder._id || selectedOrder.id,
                items: itemsPayload,
                comment
            });
            toast.success('Review submitted successfully!');
            setIsReviewOpen(false);
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to submit review';
            toast.error(msg);
            console.error(error);
        }
    };

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getMyOrders();
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                toast.error("Could not load order history");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const validOrders = orders.filter(order =>
        (order.id || order._id) &&
        order.items &&
        order.items.length > 0 &&
        (order.total || order.subTotal)
    );

    if (validOrders.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-full shadow-sm mb-6">
                    <ShoppingBag size={48} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-serif text-dark mb-4">No past orders</h1>
                <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
                <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition-all">
                    Start Ordering
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-28 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif text-dark mb-8">My Orders</h1>

                <div className="space-y-6">
                    {validOrders.map((order) => (
                        <div key={order.id || order._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-dark">Order #{(order.id || order._id || '').slice(-6).toUpperCase()}</h3>
                                        {(() => {
                                            const statusConfig = {
                                                'pending': { label: 'Order Placed', color: 'bg-yellow-100 text-yellow-700' },
                                                'confirmed': { label: 'Confirmed', color: 'bg-blue-100 text-blue-700' },
                                                'preparing': { label: 'Preparing', color: 'bg-orange-100 text-orange-700' },
                                                'out-for-delivery': { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-700' },
                                                'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-700' },
                                                'cancelled': { label: 'Cancelled', color: 'bg-red-100 text-red-700' }
                                            };
                                            const config = statusConfig[order.status] || { label: order.status || 'Unknown', color: 'bg-gray-100 text-gray-700' };
                                            return (
                                                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${config.color}`}>
                                                    {config.label}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <Calendar size={14} />
                                        <span>{order.date}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-right space-y-1">
                                        <div className="text-sm text-gray-500">
                                            <span>Subtotal: </span>
                                            <span>₹{Number(order.subTotal || order.total || 0).toFixed(2)}</span>
                                        </div>
                                        {(order.discount > 0) && (
                                            <div className="text-sm text-green-600">
                                                <span>Discount: </span>
                                                <span>-₹{Number(order.discount || 0).toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            <span>Delivery: </span>
                                            <span>₹{Number(order.deliveryFee || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="text-2xl font-bold text-primary pt-1 border-t border-gray-100">
                                            ₹{Number(order.total || 0).toFixed(2)}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image || '/img/logo.png'} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-dark">{item.title}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-700">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 flex justify-between items-center border-t border-gray-100">
                                <span className="text-xs text-gray-400">Order ID: {order._id || order.id}</span>
                                {reviewsMap[order._id || order.id] ? (
                                    <button
                                        onClick={() => handleViewReview(order, reviewsMap[order._id || order.id])}
                                        className="text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-100 transition-colors"
                                    >
                                        <Star size={16} fill="currentColor" /> Reviewed
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleOpenReview(order)}
                                        className="text-yellow-600 font-bold text-sm hover:bg-yellow-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Star size={16} /> Rate Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Modal */}
            {isReviewOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsReviewOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-serif font-bold mb-2">
                            {isViewMode ? 'Your Review' : 'Rate your Order'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            {isViewMode ? 'You submitted this review.' : 'Rate each dish and leave a comment (optional).'}
                        </p>

                        <form onSubmit={(e) => { e.preventDefault(); if (!isViewMode) handleSubmitReview(e); else setIsReviewOpen(false); }}>
                            <div className="max-h-60 overflow-y-auto mb-6 space-y-4 pr-2">
                                {isViewMode ? (
                                    // View Mode: Iterate over the SAVED review items
                                    reviewsMap[selectedOrder?._id || selectedOrder?.id]?.items?.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                                                    {/* We might not have image in review item, so try to find it in order items or show placeholder */}
                                                    {(() => {
                                                        const orderItem = selectedOrder?.items?.find(oi => oi.title === item.name);
                                                        return orderItem?.image ? <img src={orderItem.image} className="w-full h-full object-cover" /> : <Star size={16} />;
                                                    })()}
                                                </div>
                                                <span className="font-medium text-sm text-dark truncate max-w-[120px]">{item.name}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={20}
                                                        fill={star <= item.rating ? "#EAB308" : "none"}
                                                        className={star <= item.rating ? "text-yellow-500" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Edit Mode: Iterate over ORDER items
                                    selectedOrder?.items?.map((item) => {
                                        const itemId = item._id || item.id || item.title;
                                        const currentRating = itemRatings[itemId] || 5;

                                        return (
                                            <div key={itemId} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <img src={item.image || '/img/logo.png'} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                                                    <span className="font-medium text-sm text-dark truncate max-w-[120px]">{item.title}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setItemRatings(prev => ({ ...prev, [itemId]: star }))}
                                                            className="focus:outline-none transition-transform hover:scale-110"
                                                        >
                                                            <Star
                                                                size={20}
                                                                fill={star <= currentRating ? "#EAB308" : "none"}
                                                                className={star <= currentRating ? "text-yellow-500" : "text-gray-300"}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {isViewMode ? (
                                <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-600 italic">
                                    "{comment || 'No comment provided.'}"
                                </div>
                            ) : (
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Any additional feedback? (Optional)"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none mb-6 resize-none"
                                    rows="3"
                                ></textarea>
                            )}

                            {!isViewMode && (
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
                                >
                                    Submit Review
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default OrdersPage;
