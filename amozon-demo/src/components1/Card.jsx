import React from 'react';
import styles from './Card.module.css';

const Card = ({ id, title, price, rating, image, description, onAddToCart }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={title}
          className={styles.productImage}
        />
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.rating}>
        <span className={styles.stars}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
        <span className={styles.ratingNumber}>({rating})</span>
      </div>
      
      <div className={styles.priceContainer}>
        <span className={styles.price}>{price.toLocaleString('en-IN')}</span>
        <button
          onClick={onAddToCart}
          className={styles.addToCartBtn}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;