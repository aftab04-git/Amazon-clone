import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import styles from './Addcart.module.css';

const Addcart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, loading } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.Product?.price || item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const formatRupees = (amount) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  if (loading) return <div className={styles.loading}>Loading cart...</div>;

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <div className={styles.emptyCartIcon}>🛒</div>
        <h2>Your Amazon Cart is empty</h2>
        <p>Your shopping cart is waiting. Give it purpose!</p>
        <Link to="/" className={styles.shopButton}>Shop now</Link>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <h2>Cart ({cartItems.length} items)</h2>
            <button className={styles.clearCartBtn} onClick={clearCart}>Clear Cart</button>
          </div>
          {cartItems.map((item) => {
            const product = item.Product || item;
            return (
              <div key={item.id} className={styles.cartItem}>
                <img src={product.image_url || product.image} alt={product.title} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{product.title}</h3>
                  <p className={styles.itemDescription}>{product.description}</p>
                  <div className={styles.itemRating}>
                    {'★'.repeat(product.rating || 4)}{'☆'.repeat(5 - (product.rating || 4))}
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  <span className={styles.price}>{formatRupees(product.price * item.quantity)}</span>
                  <span className={styles.unitPrice}>{formatRupees(product.price)} each</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items):</span>
            <span>{formatRupees(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}><span>Shipping:</span><span>{formatRupees(shipping)}</span></div>
          <div className={styles.summaryRow}><span>GST (18%):</span><span>{formatRupees(tax)}</span></div>
          <div className={styles.summaryDivider} />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total:</span>
            <span className={styles.totalAmount}>{formatRupees(total)}</span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
          <Link to="/" className={styles.continueShopping}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Addcart;