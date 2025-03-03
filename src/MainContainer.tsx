import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { BacklightEffect } from './components/BacklightEffect';
import { CustomCursor } from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import AboutSection from './components/About/AboutContainer';

function MainContainer() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    // @ts-ignore - Using any type to bypass type checking issues
    lenisRef.current = new Lenis({
      duration: 1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      // Skip Lenis update if tab is not visible to save resources
      if (!document.hidden) {
        lenisRef.current?.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <BacklightEffect />
      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}

export default MainContainer;