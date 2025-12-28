const { sendWelcomeEmail, sendLoginAlert } = require('../utils/emailService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
        });

        if (user) {
            // Send welcome email
            try {
                await sendWelcomeEmail(user.email, user.name);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user and include password for comparison
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send login alert
        try {
            await sendLoginAlert(user.email, user.name);
        } catch (emailError) {
            console.error('Failed to send login alert:', emailError);
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Google Login (Find or Create)
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
    try {
        const { email, name, avatar, googleId } = req.body;
        console.log('Google Login Request Body:', req.body); // Debug log

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // Update googleId and avatar if missing
            if (!user.googleId) user.googleId = googleId;
            if (!user.avatar) user.avatar = avatar;
            await user.save();

            // Send login alert for Google login too
            try {
                await sendLoginAlert(user.email, user.name);
            } catch (emailError) {
                console.error('Failed to send login alert:', emailError);
            }
        } else {
            // Create new user
            // Generate a random password for Google users
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            // Ensure name is present
            const userName = name || email.split('@')[0];
            const userAvatar = avatar || `https://ui-avatars.com/api/?name=${userName}&background=random`;

            user = await User.create({
                name: userName,
                email,
                avatar: userAvatar,
                googleId,
                password: randomPassword,
            });

            // Send welcome email for new Google user
            try {
                await sendWelcomeEmail(user.email, user.name);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
            }
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            addresses: user.addresses,
            avatar: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;

        if (req.body.addresses) {
            user.addresses = req.body.addresses;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            addresses: updatedUser.addresses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, googleLogin, getProfile, updateProfile };
