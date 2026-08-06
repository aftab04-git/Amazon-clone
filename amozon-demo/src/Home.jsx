import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import * as api from "./services/api";
import Navbar from "./components1/Navbar";
import MenuRow from "./components1/MenuRow";
import SideBar from "./components1/SideBar";
import Card from "./components1/Card";
import styles from "./Home.module.css";

// Import local images (fallback)
import bag from "./assets/bag.jpg";
import charger from "./assets/charger.jpg";
import earbuds from "./assets/earbuds.jpg";
import headphones from "./assets/headphones.webp";
import keyboard from "./assets/keyboard.jpg";
import laptop from "./assets/laptop.jpg";
import menDress from "./assets/men-dress.jpg";
import mouse from "./assets/mouse.jpg";
import smartphone from "./assets/smartphone.jpg";
import speaker from "./assets/speaker.jpg";
import womenDress from "./assets/women-dress.jpg";
import bluethooth from "./assets/bltoothspeaker.jpg";

// Map backend image URLs to local imports
const imageMap = {
  "/assets/earbuds.jpg": earbuds,
  "/assets/smartphone.jpg": smartphone,
  "/assets/laptop.jpg": laptop,
  "/assets/charger.jpg": charger,
  "/assets/mouse.jpg": mouse,
  "/assets/bag.jpg": bag,
  "/assets/keyboard.jpg": keyboard,
  "/assets/bltoothspeaker.jpg": bluethooth,
  "/assets/headphones.webp": headphones,
  "/assets/men-dress.jpg": menDress,
  "/assets/women-dress.jpg": womenDress,
  "/assets/speaker.jpg": speaker,
};

function Home() {
  const { cartCount, addToCart } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback to local products if API fails
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fallback products (same as before)
  const fallbackProducts = [
    { id: 1, title: "Wireless Earbuds", price: 2499, rating: 4, image: earbuds, description: "Noise cancelling Bluetooth earbuds with 20hr battery" },
    { id: 2, title: "Smartphone", price: 18999, rating: 5, image: smartphone, description: "6.5-inch AMOLED display, 128GB storage" },
    // ... (add all your local products here if needed)
  ];

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.home}>
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />

      <MenuRow onAllClick={openSidebar} />

      {isSidebarOpen && <SideBar onClose={closeSidebar} />}

      <div className={styles.mainContent}>
        <div className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.cardsContainer}>
            {products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating || 4}
                image={imageMap[product.image_url] || earbuds}
                description={product.description}
                onAddToCart={() => addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: imageMap[product.image_url] ,
                  description: product.description,
                  rating: product.rating || 4
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;