const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// User ↔ Cart (one-to-one)
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart ↔ CartItem (one-to-many)
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Product ↔ CartItem (one-to-many)
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    User,
    Product,
    Cart,
    CartItem
};