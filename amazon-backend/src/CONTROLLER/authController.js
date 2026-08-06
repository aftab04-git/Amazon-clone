const { User, Cart } = require('../MODELS');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// @desc    Register a new user (after OTP verification)
// @route   POST /api/auth/signup
const signup = async (req, res) => {
    try {
        const { name, email, password, mobile, otpVerified } = req.body;

        // Check if OTP was verified (should be true from frontend)
        if (!otpVerified) {
            return res.status(400).json({ error: 'Please verify OTP first' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user (password hashed automatically by model hook)
        const user = await User.create({
            name,
            email,
            password, // plain password, hook will hash it
            mobile
        });

        // Create a cart for the new user
        await Cart.create({ userId: user.id });

        // Generate token
        const token = generateToken(user.id);

        // Send response (exclude password)
        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error during signup' });
    }
};

// @desc    Login user
// @route   POST /api/auth/signin
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: 'Server error during signin' });
    }
};

// @desc    Get current user (protected)
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { signup, signin, getMe };