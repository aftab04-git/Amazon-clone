const { Cart, CartItem, Product } = require('../MODELS');

// @desc    Get user's cart
// @route   GET /api/cart
const getCart = async (req, res) => {
    try {
        // Find or create cart for user
        let cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        // Get cart items with product details
        const cartItems = await CartItem.findAll({
            where: { cartId: cart.id },
            include: [{
                model: Product,
                attributes: ['id', 'title', 'price', 'image_url', 'description', 'rating']
            }]
        });

        res.json(cartItems);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Find or create cart
        let cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
            where: { cartId: cart.id, productId }
        });

        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity
            });
        }

        // Return updated cart
        const updatedCart = await CartItem.findAll({
            where: { cartId: cart.id },
            include: [{
                model: Product,
                attributes: ['id', 'title', 'price', 'image_url', 'description', 'rating']
            }]
        });

        res.json(updatedCart);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:id
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Find cart item and ensure it belongs to user's cart
        const cartItem = await CartItem.findByPk(id, {
            include: [{
                model: Cart,
                where: { userId: req.user.id }
            }]
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        if (quantity < 1) {
            await cartItem.destroy();
        } else {
            cartItem.quantity = quantity;
            await cartItem.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:id
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        // Find cart item and ensure it belongs to user's cart
        const cartItem = await CartItem.findByPk(id, {
            include: [{
                model: Cart,
                where: { userId: req.user.id }
            }]
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.destroy();
        res.json({ success: true });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (cart) {
            await CartItem.destroy({ where: { cartId: cart.id } });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};