import axios from 'axios';

// Use relative path for production (Vercel) or localhost for local dev
const API_URL = import.meta.env.PROD
    ? '/api'
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Optional: clear user data too

            // Redirect to login or force reload to reset state
            // Using window.location to ensure a hard reset of app state
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
            // Return a promise that never resolves or rejects to prevent downstream error handling (toasts)
            return new Promise(() => { });
        }
        return Promise.reject(error);
    }
);

export const authService = {
    signup: (userData) => api.post('/auth/signup', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    googleLogin: (userData) => api.post('/auth/google', userData),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (userData) => api.put('/auth/profile', userData),
};

export const orderService = {
    createOrder: (orderData) => api.post('/orders', orderData),
    getMyOrders: () => api.get('/orders'),
    getOrder: (id) => api.get(`/orders/${id}`),
};

export const reservationService = {
    createReservation: (reservationData) => api.post('/reservations', reservationData),
    getMyReservations: () => api.get('/reservations'),
    cancelReservation: (id) => api.delete(`/reservations/${id}`),
};

export const couponService = {
    validateCoupon: (code, orderTotal) => api.post('/coupons/validate', { code, orderTotal }),
};

export const feedbackService = {
    submitFeedback: (data) => api.post('/feedback', data),
};

export const reviewService = {
    addReview: (data) => api.post('/reviews', data),
    getReviews: () => api.get('/reviews'),
    getMyReviews: () => api.get('/reviews/my-reviews'),
};

export default api;
