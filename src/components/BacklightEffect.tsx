import { useEffect, useState } from 'react';
import styles from './styles/BacklightEffect.module.css';


export const BacklightEffect = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to trigger fade-in animation
    // Using a small delay to ensure the component is mounted in the DOM
    setTimeout(() => {
      setIsMounted(true);
    }, 100);

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isMounted ? 'animate-bgFadeIn' : 'opacity-0'}`}>
      {/* Top edge lights */}
      <div className={`${styles.light} ${styles.topLeft}`} />
      <div className={`${styles.light} ${styles.topRight}`} />

      {/* Bottom edge lights */}
      <div className={`${styles.light} ${styles.bottomLeft}`} />
      <div className={`${styles.light} ${styles.bottomRight}`} />

      {/* Center right light */}
      <div className={`${styles.light} ${styles.centerRight}`} />

      {/* Cursor following light */}
      <div
        className={styles.cursorLight}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
    </div>
  );
}; 