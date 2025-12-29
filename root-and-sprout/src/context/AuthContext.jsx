import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const response = await authService.login({ email, password });

            // Backend returns { _id, name, email, phone, token }
            const { token, ...userData } = response.data;

            // Add avatar
            const userWithAvatar = {
                ...userData,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff`
            };

            // Save token
            localStorage.setItem('token', token);

            // Set user
            setUser(userWithAvatar);
            return userWithAvatar;
        } catch (error) {
            throw message;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await authService.signup({ name, email, password });

            // Backend returns { _id, name, email, phone, token }
            const { token, ...userData } = response.data;

            // Add avatar
            const userWithAvatar = {
                ...userData,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
            };

            // Save token
            localStorage.setItem('token', token);

            // Set user
            setUser(userWithAvatar);
            return userWithAvatar;
        } catch (error) {
            throw message;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const loginWithGoogle = async (accessToken) => {
        try {
            // 1. Get user info from Google
            const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const { name, email, picture } = googleResponse.data;

            // 2. Send to Backend to Find or Create User
            // Use Google picture if available, otherwise generate initials
            const userAvatar = picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

            const response = await authService.googleLogin({
                email,
                name,
                avatar: userAvatar,
                googleId: googleResponse.data.sub
            });

            // Backend returns { _id, name, email, phone, token, avatar }
            const { token, ...userData } = response.data;

            // Save token
            localStorage.setItem('token', token);

            // Set user
            setUser(userData);
            return userData;

        } catch (error) {
            console.error("Google auth failed", error);
            throw error;
        }
    };

    // New function to handle Google credential (JWT) from GoogleLogin component
    const loginWithGoogleCredential = async (credential) => {
        try {
            // Decode the JWT credential to get user info
            const base64Url = credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const { name, email, picture, sub: googleId } = JSON.parse(jsonPayload);

            // Use Google picture if available, otherwise generate initials
            const userAvatar = picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

            const response = await authService.googleLogin({
                email,
                name,
                avatar: userAvatar,
                googleId
            });

            // Backend returns { _id, name, email, phone, token, avatar }
            const { token, ...userData } = response.data;

            // Save token
            localStorage.setItem('token', token);

            // Set user
            setUser(userData);
            return userData;

        } catch (error) {
            console.error("Google auth failed", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loginWithGoogleCredential }}>
            {children}
        </AuthContext.Provider>
    );
};
