import styles from "./MenuRow.module.css";

const menuItems = [
  "All",
  "Fresh",
  "MX Player",
  "Sell",
  "Bestsellers",
  "Today's Deals",
  "Mobiles",
  "Customer Service",
  "New Releases",
  "Prime",
  "Amazon Pay",
  "Electronics",
  "Fashion",
  "Home & Kitchen"
];

function MenuRow({ onAllClick }) {
  return (
    <nav className={styles.menuRow}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          onClick={item === "All" ? onAllClick : () => {}}
        >
          {item === "All" && <span className={styles.hamburger}>☰</span>}
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </nav>
  );
}

export default MenuRow;