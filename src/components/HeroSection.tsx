import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextPressure } from './utils/TextPressure';
import { ScrollReveal } from './utils/ScrollReveal';
import SplineScene from './SplineScene';
import { LandingInfo } from './LandingInfo';
import SocialIcons from './SocialIcons';
import { initScrollAnimations } from './utils/scrollAnimations';

const HeroSection = () => {
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [maxFontSize, setMaxFontSize] = useState(120);
  // Add reference to the section for scroll tracking
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform opacity based on scroll position
  // Making the fade more gradual by extending the range
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Initialize scroll animations when component mounts
    initScrollAnimations();
    
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktopView(width >= 1024);

      // Adjust font size based on screen width
      if (width >= 1440) {
        setMaxFontSize(160); // Large desktop
      } else if (width >= 1024) {
        setMaxFontSize(100); // Desktop
      } else if (width >= 768) {
        setMaxFontSize(80); // Tablet
      } else {
        setMaxFontSize(60); // Mobile
      }
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // Wrap the entire component with motion.div and use the opacity value
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="relative w-full min-h-screen"
    >
      <div className="relative w-full h-screen overflow-hidden ">
        {isDesktopView && (
          <div className="h-full flex items-center xl:pt-24">
            {/* Left column */}
            <div className="z-20 w-1/2 px-8 LandingTitle">
              <ScrollReveal animation="fade" duration={0.8} delay={0.3}>
                <h2 className="m-0 text-[32px] font-extralight tracking-[2px] text-[var(--accentColor)] ml-[4px]">
                  Hello! I'm
                </h2>
                <div className="w-full h-auto space-y-[-20px]">
                  <TextPressure
                    text="EYAD"
                    fontFamily="Geist"
                    fontUrl="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={false}
                    textColor="#FFFFFF"
                    strokeColor="#FF0000"
                    minFontSize={16}
                    maxFontSize={maxFontSize}
                  />
                  <TextPressure
                    text="NAZIR"
                    fontFamily="Geist"
                    fontUrl="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={false}
                    textColor="#FFFFFF"
                    strokeColor="#FF0000"
                    minFontSize={16}
                    maxFontSize={maxFontSize}
                  />
                </div>

                {/* Insert Social Icons horizontally between the text and LandingInfo */}
                <div className="my-2">
                  <SocialIcons />
                </div>

                <LandingInfo
                  mainTitle="A Creative"
                  swapTop="Designer"
                  swapBottom="Developer"
                  altSwapTop="Developer"
                  altSwapBottom="Designer"
                />
              </ScrollReveal>
            </div>
          </div>
        )}

        {/* Mobile version */}
        {!isDesktopView && (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <ScrollReveal animation="fade" duration={0.8} delay={0.3}>
              <h2 className="text-[26px] font-extralight tracking-[2px] text-[var(--accentColor)]">
                Hello! I'm
              </h2>
              <h1 className="text-[44px] font-semibold tracking-[2px] leading-[40px] text-white mb-0">
                EYAD <br /> NAZIR
              </h1>
            </ScrollReveal>
            <Suspense
              fallback={
                <div className="w-full h-[50vh] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-transparent border-[var(--accentColor)] rounded-full animate-spin"></div>
                  <p className="mt-4 text-white/70 font-light">Loading 3D experience...</p>
                </div>
              }
            >
              <SplineScene />
            </Suspense>
            <ScrollReveal animation="fade" duration={0.8} delay={0.5}>
              <LandingInfo
                mainTitle="A Creative"
                swapTop="Designer"
                swapBottom="Developer"
                altSwapTop="Developer"
                altSwapBottom="Designer"
              />
            </ScrollReveal>
          </div>
        )}
      </div>

      {isDesktopView && (
        <div data-cursor="disable" className="overflow-hidden">
          <Suspense
            fallback={
              <div className="absolute top-0 right-0 w-1/2 h-screen flex flex-col items-center justify-center overflow-hidden LandingTitle">
                <div className="w-16 h-16 border-4 border-t-transparent border-[var(--accentColor)] rounded-full animate-spin"></div>
                <p className="mt-4 text-white/70 font-light">Loading 3D experience...</p>
              </div>
            }
          >
            <SplineScene />
          </Suspense>
        </div>
      )}
    </motion.div>
  );
};

export default HeroSection;