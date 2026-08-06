import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from './services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load cart when user is logged in
  const loadCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    setLoading(true);
    try {
      const items = await api.getCart();
      setCartItems(items);
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadCart();
  }, []);

  // Reload cart when storage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      loadCart();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to add items to cart');
      window.location.href = '/signin';
      return;
    }

    try {
      const updatedCart = await api.addToCart(product.id, 1);
      setCartItems(updatedCart);
      const count = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(cartItemId);
        return;
      }
      await api.updateCartItem(cartItemId, newQuantity);
      // Update local state
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
      const newCount = cartItems.reduce((sum, item) =>
        item.id === cartItemId ? sum + newQuantity : sum + item.quantity, 0
      );
      setCartCount(newCount);
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.removeFromCart(cartItemId);
      const updatedItems = cartItems.filter(item => item.id !== cartItemId);
      setCartItems(updatedItems);
      const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Remove from cart error:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);