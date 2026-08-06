// src/services/api.js
const API_URL = "https://amazon-clone-backend.onrender.com";

// ========== Helper ==========
const getToken = () => localStorage.getItem('token');

// ========== OTP APIs ==========
export const requestOTP = async (email, name = 'User') => {
  const res = await fetch(`${API_URL}/otp/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
  return data;
};                                                  

export const verifyOTP = async (email, otp) => {
  const res = await fetch(`${API_URL}/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Invalid OTP');
  return data;
};

export const resendOTP = async (email) => {
  const res = await fetch(`${API_URL}/otp/resend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to resend OTP');
  return data;
};

// ========== Auth APIs ==========
export const signUp = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  // Save token and user
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const signIn = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signin failed');
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ========== Product APIs ==========
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Product not found');
  return data;
};

// ========== Cart APIs ==========
export const getCart = async () => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch cart');
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await fetch(`${API_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to add to cart');
  return data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const res = await fetch(`${API_URL}/cart/update/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update cart');
  return data;
};

export const removeFromCart = async (cartItemId) => {
  const res = await fetch(`${API_URL}/cart/remove/${cartItemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to remove item');
  return data;
};

export const clearCart = async () => {
  const res = await fetch(`${API_URL}/cart/clear`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to clear cart');
  return data;
};