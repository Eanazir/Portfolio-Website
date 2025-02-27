import { Header } from './components/Header';
import { BacklightEffect } from './components/BacklightEffect';
import { CustomCursor } from './components/CustomCursor';
import HeroSection from './components/HeroSection';

function MainContainer() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <BacklightEffect />
      <CustomCursor />
      <Header />
      <HeroSection />
    </div>
  );
}

export default MainContainer;