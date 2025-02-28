import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./styles/CustomCursor.module.css";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let currentIconContainer: HTMLElement | null = null;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const animateCursor = () => {
      if (currentIconContainer) {
        const rect = currentIconContainer.getBoundingClientRect();

        // Check if mouse is outside the container bounds
        if (
          mousePos.x < rect.left - 10 ||
          mousePos.x > rect.right + 10 ||
          mousePos.y < rect.top - 10 ||
          mousePos.y > rect.bottom + 10
        ) {
          resetIconCursor();
        }
      } else if (!hover) {
        // Continue animating even when disabled - just rely on CSS to hide it
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, {
          x: cursorPos.x,
          y: cursorPos.y,
          duration: 0.1,
          overwrite: true
        });
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const iconContainer = target.closest('[data-cursor="icons"]') as HTMLElement;
      const disableContainer = target.closest('[data-cursor="disable"]');

      if (disableContainer) {
        cursor.classList.add(styles.cursorDisable);
      }
      else if (iconContainer && !currentIconContainer) {
        currentIconContainer = iconContainer;
        const rect = iconContainer.getBoundingClientRect();

        cursor.classList.add(styles.cursorIcons);
        gsap.killTweensOf(cursor);

        gsap.to(cursor, {
          width: rect.width,
          height: rect.height,
          duration: 0.2,
          ease: 'power2.out',
        });

        gsap.to(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.2,
          ease: 'power2.out',
        });

        hover = true;
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const disableContainer = target.closest('[data-cursor="disable"]');

      if (disableContainer) {
        cursor.classList.remove(styles.cursorDisable);
      }
    };

    const resetIconCursor = () => {
      currentIconContainer = null;
      hover = false;

      gsap.killTweensOf(cursor);
      gsap.to(cursor, {
        width: 'var(--size)',
        height: 'var(--size)',
        duration: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          cursor.classList.remove(styles.cursorIcons);
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div className={styles.cursorMain} ref={cursorRef} />;
};