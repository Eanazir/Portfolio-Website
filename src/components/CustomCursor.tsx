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

    // Update mouse position on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animate the cursor to smoothly follow the mouse
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.set(cursor, { 
          x: cursorPos.x, 
          y: cursorPos.y,
          force3D: true
        });
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Global event listeners using capture mode
    // When pointer enters any element with data-cursor="disable", hide the custom cursor.
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest('[data-cursor="disable"]')) {
        cursor.classList.add(styles.cursorDisable);
      }
    };

    // When pointer leaves, show the custom cursor.
    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest('[data-cursor="disable"]')) {
        cursor.classList.remove(styles.cursorDisable);
      }
    };

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
    };
  }, []);
  
  return <div className={styles.cursorMain} ref={cursorRef}></div>;
};