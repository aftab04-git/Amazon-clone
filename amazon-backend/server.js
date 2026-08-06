const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testConnection } = require('./src/CONFIG/database');
const { User, Product, Cart, CartItem } = require('./src/MODELS'); // Associations are set in index.js

// Import routes
const authRoutes = require('./src/ROUTE/authRoute');
const productRoutes = require('./src/ROUTE/productRoute');
const cartRoutes = require('./src/ROUTE/cartRoute');
const otpRoutes = require('./src/ROUTE/otpRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your React frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Amazon Clone Backend is running',
        timestamp: new Date().toISOString()
    });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/otp', otpRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
    try {
        await testConnection();                // Check DB connection
        await sequelize.sync({ alter: true }); // Sync models with DB (creates tables if needed)
        console.log('✅ Database synced');
        console.log('✅ Models loaded: User, Product, Cart, CartItem');

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`📝 Test: http://localhost:${PORT}/api/health`);
            console.log(`🔑 Auth: http://localhost:${PORT}/api/auth`);
            console.log(`📦 Products: http://localhost:${PORT}/api/products`);
            console.log(`🛒 Cart: http://localhost:${PORT}/api/cart`);
            console.log(`📧 OTP: http://localhost:${PORT}/api/otp`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();