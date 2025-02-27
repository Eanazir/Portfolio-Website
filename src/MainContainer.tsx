import { Header } from './components/Header';
import { BacklightEffect } from './components/BacklightEffect';
import { CustomCursor } from './components/CustomCursor';
import HeroSection from './components/HeroSection';

function MainContainer() {
  return (
    <>
      <BacklightEffect />
      <CustomCursor />
      <Header />
      <HeroSection />
    </>
  );
}

export default MainContainer;