import React, { useState, useEffect } from 'react';
import styles from './styles/HoverLinks.module.css';

interface HoverLinksProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const HoverLinks: React.FC<HoverLinksProps> = ({ text, href, onClick }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to trigger fade-in animation with a delay
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 400); // Delay nav links appearance by 400ms to ensure background appears first
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${styles.hoverLink} ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`}
      data-cursor="disable"
    >
      <div className={`${styles.frontText} font-semibold text-lg`}>{text}</div>
      <div className={`${styles.backText} font-semibold text-lg`}>{text}</div>
    </a>
  );
};

export default HoverLinks;