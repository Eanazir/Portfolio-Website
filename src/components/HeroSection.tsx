import { useState, useEffect } from 'react';
import { TextPressure } from './utils/TextPressure';
import { ScrollReveal } from './utils/ScrollReveal';
import SplineScene from './SplineScene';
import { LandingInfo } from './LandingInfo';

const HeroSection = () => {
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth >= 1300);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Hero Section with responsive layout */}
      <div className="relative w-full h-screen">
        {/* Desktop: Left aligned text */}
        {isDesktopView && (
          <div className="h-full flex items-center">
            <div className="z-20 w-1/2 px-8">
              <ScrollReveal animation="fade" duration={0.8} delay={0.1}>
                <h2 className="m-0 text-[32px] font-extralight tracking-[2px] text-[var(--accentColor)] ml-[4px]">
                  Hello! I'm
                </h2>
                <div style={{ width: "90%", height: "auto" }}>
                  <TextPressure
                    text={`EYAD     `}
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
                  />
                  <br />
                  <TextPressure
                    text={`NAZIR    `}
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
                  />
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

        {/* Mobile: Stacked layout with centered text and scene below */}
        {!isDesktopView && (
          <div className="h-full flex flex-col justify-center items-center text-center pt-10">
            <ScrollReveal animation="fade" duration={0.8} delay={0.1}>
              <h2 className="m-0 text-[32px] font-extralight tracking-[2px] text-[var(--accentColor)]">
                Hello! I'm
              </h2>
              <h1 className="text-[60px] font-semibold tracking-[2px] leading-[48px] text-white mb-0">
                EYAD  <br /> NAZIR
              </h1>
            </ScrollReveal>
            <SplineScene />
            <ScrollReveal animation="fade" duration={0.8} delay={0.3}>
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

      {/* Desktop Spline scene */}
      {isDesktopView && (
        <div data-cursor="disable">
          <SplineScene />
        </div>
      )}
    </>
  );
};

export default HeroSection; 