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

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

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
        } else {
          // Update cursor position
          gsap.set(cursor, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      } else if (!hover) {
        cursorPos.x += (mousePos.x - cursorPos.x) / 6;
        cursorPos.y += (mousePos.y - cursorPos.y) / 6;
        gsap.set(cursor, {
          x: cursorPos.x,
          y: cursorPos.y,
        });
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const iconContainer = target.closest('[data-cursor="icons"]') as HTMLElement;

      if (iconContainer && !currentIconContainer) {
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

        gsap.set(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });

        hover = true;
      } else if (target.closest('[data-cursor="disable"]')) {
        cursor.classList.add(styles.cursorDisable);
      }
    };

    const resetIconCursor = () => {
      currentIconContainer = null;
      hover = false;

      gsap.killTweensOf(cursor);
      gsap.to(cursor, {
        width: 'var(--size)',
        height: 'var(--size)',
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          cursor.classList.remove(styles.cursorIcons);
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  return <div className={styles.cursorMain} ref={cursorRef} />;
};