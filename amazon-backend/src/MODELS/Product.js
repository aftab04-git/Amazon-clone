const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    original_price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image_url: {
        type: DataTypes.STRING(500)
    },
    category: {
        type: DataTypes.STRING(100)
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    sponsored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
});

module.exports = Product;