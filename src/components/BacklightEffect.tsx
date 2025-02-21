import { useEffect, useRef } from 'react';
import styles from './BacklightEffect.module.css';

export const BacklightEffect = () => {
  return (
    <div className={styles.container}>
      {/* Top edge lights */}
      <div className={`${styles.light} ${styles.topLeft}`} />
      <div className={`${styles.light} ${styles.topRight}`} />
      
      {/* Bottom edge lights */}
      <div className={`${styles.light} ${styles.bottomLeft}`} />
      <div className={`${styles.light} ${styles.bottomRight}`} />
      
      {/* Center right light */}
      <div className={`${styles.light} ${styles.centerRight}`} />
    </div>
  );
}; 