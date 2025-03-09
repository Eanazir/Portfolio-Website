import React, { useState, useEffect, MouseEvent } from 'react';
import styles from './styles/HoverLinks.module.css';

interface HoverLinksProps {
  text: string;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
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

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // If onClick is provided, call it
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${styles.hoverLink} ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`}
      data-cursor="disable"
    >
      <div className={`${styles.frontText} font-semibold text-lg`}>{text}</div>
      <div className={`${styles.backText} font-semibold text-lg`}>{text}</div>
    </a>
  );
};

export default HoverLinks;