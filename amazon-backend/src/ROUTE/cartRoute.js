const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../CONTROLLER/cartController');
const { authenticateToken } = require('../MIDDLEWARE/auth');

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:id', updateCartItem);
router.delete('/remove/:id', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;