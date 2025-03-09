import React, { useEffect, useState, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';
import './styles/SocialIcons.css';
import HoverLinks from './HoverLinks';

const SocialIcons: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const socialRef = useRef<HTMLDivElement>(null);
    const animationFramesRef = useRef<number[]>([]);

    // Function to set up mouse listeners and animations
    const setupSocialInteractions = () => {
        const social = document.getElementById("social") as HTMLElement;
        if (!social) return [];

        const cleanupFunctions: Array<() => void> = [];

        social.querySelectorAll("span").forEach((item) => {
            const elem = item as HTMLElement;
            const link = elem.querySelector("a") as HTMLElement;

            const rect = elem.getBoundingClientRect();
            let mouseX = rect.width / 2;
            let mouseY = rect.height / 2;
            let currentX = 0;
            let currentY = 0;

            const updatePosition = () => {
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;

                link.style.setProperty("--siLeft", `${currentX}px`);
                link.style.setProperty("--siTop", `${currentY}px`);

                const frameId = requestAnimationFrame(updatePosition);
                animationFramesRef.current.push(frameId);
            };

            const onMouseMove = (e: globalThis.MouseEvent) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x < 45 && x > 5 && y < 45 && y > 5) {
                    mouseX = x;
                    mouseY = y;
                } else {
                    mouseX = rect.width / 2;
                    mouseY = rect.height / 2;
                }
            };

            document.addEventListener("mousemove", onMouseMove);
            const frameId = requestAnimationFrame(updatePosition);
            animationFramesRef.current.push(frameId);

            cleanupFunctions.push(() => {
                document.removeEventListener("mousemove", onMouseMove);
            });
        });

        return cleanupFunctions;
    };

    useEffect(() => {
        // Set mounted state to trigger fade-in animation
        setIsMounted(true);

        // Handle scroll event to change icon orientation
        const handleScroll = () => {
            // Change to vertical when scrolled more than 600px
            if (window.scrollY > 600) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Initial check in case page is loaded already scrolled
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        // Initial setup
        let cleanupFunctions = setupSocialInteractions();

        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Clean up all mouse event listeners
            cleanupFunctions.forEach(cleanup => cleanup());
            // Cancel all animation frames
            animationFramesRef.current.forEach(frameId => cancelAnimationFrame(frameId));
            animationFramesRef.current = [];
        };
    }, []);

    // Re-setup interactions when scrolled state changes
    useEffect(() => {
        // Clean up existing animation frames
        animationFramesRef.current.forEach(frameId => cancelAnimationFrame(frameId));
        animationFramesRef.current = [];

        // Small delay to ensure DOM is updated after portal rendering
        const timeoutId = setTimeout(() => {
            const cleanupFunctions = setupSocialInteractions();
            return () => {
                cleanupFunctions.forEach(cleanup => cleanup());
            };
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [isScrolled]);

    // Social icons component
    const SocialIconsComponent = (
        <div
            className={`icons-section ${isScrolled ? 'vertical' : 'horizontal'} ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`}
            ref={socialRef}
        >
            <div className="social-icons" data-cursor="icons" id="social">
                <span>
                    <a
                        href="https://github.com/Eanazir"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        tabIndex={0}
                    >
                        <FaGithub />
                    </a>
                </span>
                <span>
                    <a
                        href="https://www.linkedin.com/in/eyad-nazir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        tabIndex={0}
                    >
                        <FaLinkedinIn />
                    </a>
                </span>
                <span>
                    <a
                        href="https://www.instagram.com/eyadakn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        tabIndex={0}
                    >
                        <FaInstagram />
                    </a>
                </span>
                <span>
                    <a
                        href="https://x.com/Eyadakn1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (Twitter)"
                        tabIndex={0}
                    >
                        <FaXTwitter />
                    </a>
                </span>
            </div>
        </div>
    );

    // Resume button component
    const ResumeButtonComponent = (
        <div className="resume-button-container">
            <HoverLinks
                text="RESUME"
                href="#"
                onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault(); // Prevent default navigation from href
                    window.open('/resume_.pdf', '_blank', 'noopener,noreferrer');
                }}
            />
            <span className="resume-icon">
                <TbNotes />
            </span>
        </div>
    );

    // When in vertical mode (scrolled), portal the component to the body to ensure it's visible across all pages
    return (
        <>
            {isScrolled
                ? createPortal(SocialIconsComponent, document.body)
                : SocialIconsComponent}
            {createPortal(ResumeButtonComponent, document.body)}
        </>
    );
};

export default SocialIcons;