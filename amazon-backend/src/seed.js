const { sequelize } = require('../CONFIG/database');
const Product = require('./MODELS/Product');

const sampleProducts = [
    {
        title: "Wireless Earbuds",
        description: "Noise cancelling Bluetooth earbuds with 20hr battery life",
        price: 2499,
        original_price: 3999,
        discount: 38,
        image_url: "/assets/earbuds.jpg",
        category: "Electronics",
        rating: 4.2,
        rating_count: 1245,
        stock_quantity: 50,
        sponsored: true
    },
    {
        title: "Smartphone",
        description: "6.5-inch AMOLED display, 128GB storage, 5G capable",
        price: 18999,
        original_price: 21999,
        discount: 14,
        image_url: "/assets/smartphone.jpg",
        category: "Mobiles",
        rating: 4.5,
        rating_count: 3456,
        stock_quantity: 30,
        sponsored: true
    },
    {
        title: "Gaming Laptop",
        description: "Intel i7, 16GB RAM, 1TB SSD, RTX 3060, 144Hz display",
        price: 84999,
        original_price: 99999,
        discount: 15,
        image_url: "/assets/laptop.jpg",
        category: "Laptops",
        rating: 4.7,
        rating_count: 892,
        stock_quantity: 15,
        sponsored: false
    },
    {
        title: "Fast Charger 65W",
        description: "USB-C PD fast charger for laptops and phones",
        price: 899,
        original_price: 1499,
        discount: 40,
        image_url: "/assets/charger.jpg",
        category: "Accessories",
        rating: 4.0,
        rating_count: 567,
        stock_quantity: 200,
        sponsored: false
    },
    {
        title: "Wireless Mouse",
        description: "Ergonomic wireless mouse with silent clicks, 2.4GHz",
        price: 699,
        original_price: 1299,
        discount: 46,
        image_url: "/assets/mouse.jpg",
        category: "Accessories",
        rating: 4.3,
        rating_count: 2341,
        stock_quantity: 150,
        sponsored: false
    },
    {
        title: "Gaming Keyboard",
        description: "Mechanical RGB keyboard with blue switches, wrist rest",
        price: 3499,
        original_price: 4999,
        discount: 30,
        image_url: "/assets/keyboard.jpg",
        category: "Electronics",
        rating: 4.6,
        rating_count: 789,
        stock_quantity: 40,
        sponsored: true
    },
    {
        title: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 12hr battery, deep bass",
        price: 2599,
        original_price: 3999,
        discount: 35,
        image_url: "/assets/bltoothspeaker.jpg",
        category: "Audio",
        rating: 4.4,
        rating_count: 1102,
        stock_quantity: 60,
        sponsored: false
    },
    {
        title: "Men's Casual Shirt",
        description: "Cotton formal shirt for men, all sizes available",
        price: 1199,
        original_price: 1999,
        discount: 40,
        image_url: "/assets/men-dress.jpg",
        category: "Fashion",
        rating: 4.1,
        rating_count: 876,
        stock_quantity: 100,
        sponsored: false
    },
    {
        title: "Women's Kurti",
        description: "Cotton printed kurti with embroidery work",
        price: 899,
        original_price: 1799,
        discount: 50,
        image_url: "/assets/women-dress.jpg",
        category: "Fashion",
        rating: 4.5,
        rating_count: 654,
        stock_quantity: 80,
        sponsored: false
    },
    {
        title: "Laptop Backpack",
        description: "Water resistant backpack with laptop compartment, USB port",
        price: 1499,
        original_price: 2499,
        discount: 40,
        image_url: "/assets/bag.jpg",
        category: "Accessories",
        rating: 4.3,
        rating_count: 932,
        stock_quantity: 120,
        sponsored: false
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Database synced');

        // Use cascade to truncate dependent tables (cart_items)
        await Product.destroy({ truncate: true, cascade: true });
        console.log('✅ Existing products cleared (with cascade)');

        await Product.bulkCreate(sampleProducts);
        console.log('✅ Sample products added!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();