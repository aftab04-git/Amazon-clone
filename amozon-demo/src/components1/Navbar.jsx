import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.jpg";

function Navbar({ cartCount, isLoggedIn, userName, onLogout }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.logoBox}>
        <Link to="/">
          <img src={logo} alt="Amazon" className={styles.logo} />
        </Link>
        <div className={styles.location}>
          <span>Delivering to</span>
          <strong>Bengaluru 560048</strong>
        </div>
      </div>

      <div className={styles.search}>
        <select>
          <option>All</option>
          <option>Laptops</option>
          <option>Mobile</option>
          <option>Electronic</option>
          <option>Kids</option>
          <option>Mens</option>
        </select>
        <input placeholder="Search Amazon.in" />
        <button>🔍</button>
      </div>

      <div className={styles.right}>
        <div className={styles.signin}>
          {isLoggedIn ? (
            <div>
              <span>Hello, {userName}</span>
              <strong 
                onClick={onLogout}
                style={{ cursor: 'pointer', color: '#febd69' }}
              >
                Logout
              </strong>
            </div>
          ) : (
            <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <span>Hello, sign in</span>
                <strong>Account & Lists</strong>
              </div>
            </Link>
          )}
        </div>

        <div className={styles.returns}>
          <span>Returns</span>
          <strong>& Orders</strong>
        </div>

        <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
          <div className={styles.cart}>
            <span className={styles.count}>{cartCount}</span>
            🛒
            <strong>Cart</strong>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;