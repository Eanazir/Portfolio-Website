import React, { useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import './LandingInfo.css';

export interface LandingInfoProps {
  mainTitle?: string;
  swapTop?: string;
  swapBottom?: string;
  altSwapTop?: string;
  altSwapBottom?: string;
}

const parentVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const topLetterVariants = {
  initial: { y: 0, opacity: 1 },
  animate: { y: '-100%', opacity: 0 },
};

const bottomLetterVariants = {
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
          key={i}
          variants={letterVariant}
          style={{ display: 'inline-block' }}
          transition={{
            duration: 0.4, // Duration for each letter’s flip
            ease: 'easeInOut',
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
  // Cycle between "initial" and "animate" every 2 seconds
  const [animationState, cycleAnimation] = useCycle('initial', 'animate');
  useEffect(() => {
    const interval = setInterval(() => {
      cycleAnimation();
    }, 2000);
    return () => clearInterval(interval);
  }, [cycleAnimation]);

  return (
    <div className="infoContainer">
      <h3>{mainTitle}</h3>

      {/* FIRST PAIR */}
      <h2 className="infoSwap">
        <div className="swapWrapper">
          {/* Top text container */}
          <motion.div
            className="swapTop"
            variants={parentVariants}
            animate={animationState}
          >
            <SplitText text={swapTop} isTop />
          </motion.div>

          {/* Bottom text container */}
          <motion.div
            className="swapBottom"
            variants={parentVariants}
            animate={animationState}
          >
            <SplitText text={swapBottom} isTop={false} />
          </motion.div>

          {/* Invisible element to force container width to the longer word */}
          <span className="invisibleContent">{swapBottom}</span>
        </div>
      </h2>

      {/* SECOND PAIR */}
      <h2 className="infoSwapAlt">
        <motion.div
          className="swapAltTop"
          variants={parentVariants}
          animate={animationState}
        >
          <SplitText text={altSwapTop} isTop />
        </motion.div>

        <motion.div
          className="swapAltBottom"
          variants={parentVariants}
          animate={animationState}
        >
          <SplitText text={altSwapBottom} isTop={false} />
        </motion.div>
      </h2>
    </div>
  );
};