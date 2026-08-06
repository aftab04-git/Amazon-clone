import styles from "./SideBar.module.css";

function SideBar({ onClose }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div className={styles.header}>
          <h1>Hello, sign in</h1>
          <p>Account & Lists</p>
        </div>

        <div className={styles.section}>
          <h2>Trending</h2>
          <ul>
            <li>Bestsellers</li>
            <li>New Releases</li>
            <li>Movers and Shakers</li>
            <li className={styles.subCategory}>Digital Content and Devices</li>
            <li className={styles.indent}>Echo & Alexa</li>
            <li className={styles.indent}>Fire TV</li>
            <li className={styles.indent}>Kindle E-Readers & eBooks</li>
            <li className={styles.indent}>Audible Audiobooks</li>
          </ul>
        </div>

        <hr />

        <div className={styles.section}>
          <h3>Search Anything in</h3>
          <ul>
            <li>Day's Deals</li>
            <li>Mobiles</li>
            <li>Customer Service</li>
            <li>New Releases</li>
            <li>Prime</li>
            <li>Amazon Pay</li>
          </ul>
        </div>

        <hr />

        <div className={styles.section}>
          <h3>Featured Products</h3>
          <div className={styles.product}>
            <strong>14 AI Evo, Intel</strong>
            <p>1st Gen. Ultra 7 155H,Built-in D+ 144Hz Laptop(32GB/1TB NVMe...)</p>
          </div>
          <div className={styles.product}>
            <strong>MSI Summit 13 AI Evo, Intel</strong>
            <p>1st Gen. Ultra 7 155H,Built-in D+ 144Hz Laptop(32GB/1TB NVMe...)</p>
          </div>
        </div>

        <hr />

        <div className={styles.section}>
          <h3>Promotions</h3>
          <p className={styles.promo}><strong>Promotion @</strong></p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;