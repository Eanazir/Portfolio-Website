"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 2;

// Helper function to highlight specific words with accent color
const formatText = (text: string, highlightWords: string[] = []): string => {
  if (!highlightWords.length) return text;

  // Create a regex pattern to match all words to highlight
  const pattern = new RegExp(`(${highlightWords.join('|')})`, 'g');

  // Replace each match with a wrapped version
  return text.replace(pattern, '<span class="text-[var(--accentColor)]">$1</span>');
};

const useMorphingText = (texts: string[], highlightWords: string[] = []) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const [isMorphing, setIsMorphing] = useState(false);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  // Format all texts with highlighting
  const formattedTexts = texts.map(text => formatText(text, highlightWords));

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      // When morphing starts, set the state
      if (!isMorphing && fraction < 1) {
        setIsMorphing(true);
      }

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.innerHTML = formattedTexts[textIndexRef.current % texts.length];
      current2.innerHTML = formattedTexts[(textIndexRef.current + 1) % texts.length];
    },
    [texts, formattedTexts, isMorphing],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";

      // When morphing completes, update the state
      if (isMorphing) {
        setIsMorphing(false);
      }
    }
  }, [isMorphing]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip animation if tab is not visible to save resources
      if (document.hidden) {
        return;
      }

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref, isMorphing };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
  highlightWords?: string[];
}

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  highlightWords = ["Mind", "Soul"],
}) => {
  const { text1Ref, text2Ref, isMorphing } = useMorphingText(texts, highlightWords);

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none md:h-24 lg:text-[6rem]",
        // Only apply blur filter when morphing is active
        isMorphing ? "[filter:url(#threshold)_blur(0.6px)]" : "",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
      <SvgFilters />
    </div>
  );
};
