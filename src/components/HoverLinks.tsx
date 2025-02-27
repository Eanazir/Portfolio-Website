import React from 'react';
import styles from './styles/HoverLinks.module.css';

interface HoverLinksProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const HoverLinks: React.FC<HoverLinksProps> = ({ text, href, onClick }) => {
  return (
    <a 
      href={href}
      onClick={onClick} 
      className={styles.hoverLink}
      data-cursor="disable"
    >
      <div className={`${styles.frontText} font-semibold text-lg`}>{text}</div>
      <div className={`${styles.backText} font-semibold text-lg`}>{text}</div>
    </a>
  );
};

export default HoverLinks;