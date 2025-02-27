import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles/LandingInfo.css';

export interface LandingInfoProps {
  mainTitle?: string;
  swapTop?: string;
  swapBottom?: string;
  altSwapTop?: string;
  altSwapBottom?: string;
}

const topLetterVariants = {
  // Top word: from y=0 -> y=-100%
  initial: { y: 0, opacity: 1 },
  animate: { y: '-100%', opacity: 0 },
};

const bottomLetterVariants = {
  // Bottom word: from y=100% -> y=0
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

function SplitText({
  text,
  isTop,
}: {
  text: string;
  isTop: boolean;
}) {
  const letterVariant = isTop ? topLetterVariants : bottomLetterVariants;
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={text + i}
          variants={letterVariant}
          initial="initial"
          animate="animate"
          style={{ display: 'inline-block' }}
          transition={{
            duration: 0.9,
            ease: 'easeInOut',
            delay: i * 0.09,
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export const LandingInfo: React.FC<LandingInfoProps> = ({
  mainTitle = 'A Creative',
  swapTop = 'Designer',
  swapBottom = 'Developer',
  altSwapTop = 'Developer',
  altSwapBottom = 'Designer',
}) => {
  const [isSwap, setIsSwap] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwap((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="infoContainer ">
      <h3>{mainTitle}</h3>

      {/* FIRST PAIR (Designer / Developer) */}
      <h2 className="infoSwap">
        <div className="swapWrapper">
          {/* Top animated text (absolutely positioned) */}
          <div className="swapTop">
            <SplitText text={isSwap ? swapBottom : swapTop} isTop />
          </div>

          {/* Bottom animated text (absolutely positioned) */}
          <div className="swapBottom">
            <SplitText text={isSwap ? swapTop : swapBottom} isTop={false} />
          </div>

          {/* Invisible element to lock container width */}
          <span className="invisibleContent">{swapBottom}</span>
        </div>
      </h2>

      {/* SECOND PAIR (altSwapTop / altSwapBottom) */}
      <h2 className="infoSwapAlt">
        <div className="swapAltTop">
          <SplitText text={isSwap ? altSwapBottom : altSwapTop} isTop />
        </div>
        <div className="swapAltBottom">
          <SplitText text={isSwap ? altSwapTop : altSwapBottom} isTop={false} />
        </div>
        {/* Invisible element to lock container width */}

      </h2>
    </div>
  );
};