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
    // Keep track of the current icon container we're hovering
    let currentIconContainer: HTMLElement | null = null;

    // Track mouse position at all times
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      // If we're currently hovering an icon container, update cursor position
      // based on the container, not individual child elements
      if (currentIconContainer) {
        const rect = currentIconContainer.getBoundingClientRect();
        cursor.style.left = `${rect.left + rect.width / 2}px`;
        cursor.style.top = `${rect.top + rect.height / 2}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Smoothly animate the cursor toward the mouse if we're not "stuck"
    const loop = () => {
      if (!hover) {
        const delay = 6; // Higher delay -> slower follow
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;

        gsap.set(cursor, {
          x: cursorPos.x,
          y: cursorPos.y,
          force3D: true,
        });
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // When pointer enters an element with data-cursor
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      // For icons, we only care about the container element
      const iconContainer = target.closest('[data-cursor="icons"]') as HTMLElement;
      if (iconContainer && !currentIconContainer) {
        console.log("ENTER: Icon container detected", iconContainer);
        currentIconContainer = iconContainer;
        const rect = iconContainer.getBoundingClientRect();

        // Add class for styling
        cursor.classList.add(styles.cursorIcons);

        // Clear previous GSAP animations
        gsap.killTweensOf(cursor);

        // Update cursor size
        gsap.to(cursor, {
          width: rect.width,
          height: rect.height,
          duration: 0.1,
          ease: 'power2.out',
        });

        // Position manually
        cursor.style.left = `${rect.left + rect.width / 2}px`;
        cursor.style.top = `${rect.top + rect.height / 2}px`;

        // Mark as hovering
        hover = true;

        // Add pointer leave event directly to the container
        // This ensures we detect leaving from any edge
        iconContainer.addEventListener('mouseleave', handleContainerLeave);
        return;
      }

      // Handle disable cursor
      if (target.closest('[data-cursor="disable"]')) {
        cursor.classList.add(styles.cursorDisable);
      }
    };

    // Direct handler for container mouseleave
    const handleContainerLeave = () => {
      console.log("RESET: handleContainerLeave called");
      resetIconCursor();
    };

    // When pointer leaves
    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      // Handle disable cursor
      if (target.closest('[data-cursor="disable"]')) {
        cursor.classList.remove(styles.cursorDisable);
      }
    };

    // Reset icon cursor state
    const resetIconCursor = () => {
      console.log("Resetting icon cursor");
      // Clear current container reference
      currentIconContainer = null;

      // Clear manual positioning
      cursor.style.left = "";
      cursor.style.top = "";

      // Stop any running animations
      gsap.killTweensOf(cursor);

      // Restore default cursor
      gsap.to(cursor, {
        width: 'var(--size)',
        height: 'var(--size)',
        borderRadius: '50px',
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          cursor.classList.remove(styles.cursorIcons);
        }
      });

      hover = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);

      // Clean up any remaining container listeners
      if (currentIconContainer) {
        currentIconContainer.removeEventListener('mouseleave', handleContainerLeave);
      }
    };
  }, []);

  return <div className={styles.cursorMain} ref={cursorRef} />;
};