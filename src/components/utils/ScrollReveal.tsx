import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * A container that reveals its children via GSAP
 * once (or repeatedly) when scrolled into view.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.8,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Determine initial + final animation props for GSAP
  const getInitialProps = () => {
    switch (animation) {
      case 'fade':
        return { opacity: 0, y: 30 };
      case 'slide':
        return { opacity: 0, x: -50 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'blur':
        return { opacity: 0, filter: 'blur(10px)' };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimationProps = () => {
    switch (animation) {
      case 'fade':
        return { opacity: 1, y: 0 };
      case 'slide':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'blur':
        return { opacity: 1, filter: 'blur(0px)' };
      default:
        return { opacity: 1 };
    }
  };

  // Observe element visibility via IntersectionObserver
  useEffect(() => {
    if (!elementRef.current) return;

    // Initialize GSAP so the container starts hidden
    gsap.set(elementRef.current, getInitialProps());

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, threshold]);

  // When visible toggles, animate in or reset
  useEffect(() => {
    if (!elementRef.current) return;

    if (isVisible) {
      gsap.to(elementRef.current, {
        ...getAnimationProps(),
        duration,
        delay,
        ease: 'power2.out',
      });
    } else if (!once) {
      // Reset to initial if we're allowing repeated triggers
      gsap.set(elementRef.current, getInitialProps());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};