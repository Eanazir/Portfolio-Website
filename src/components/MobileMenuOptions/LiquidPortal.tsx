import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./LiquidPortal.css";

interface LiquidPortalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const LiquidPortal: React.FC<LiquidPortalProps> = ({ isOpen, onClose, currentSection }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const waveRef = useRef<SVGSVGElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!menuRef.current) return;

        const tl = gsap.timeline({ paused: true });
        const wave = waveRef.current;
        const content = contentRef.current;
        const menuItems = menuRef.current.querySelectorAll(".menu-item");
        const socialIcons = menuRef.current.querySelectorAll(".social-icon");

        // Reset position
        gsap.set(menuRef.current, { x: "100%" });
        gsap.set([menuItems, socialIcons], { x: 50, opacity: 0 });
        gsap.set(wave, { scaleY: 0, transformOrigin: "center right" });

        // Create animation
        tl.to(menuRef.current, { x: "0%", duration: 0.6, ease: "power3.out" })
            .to(wave, { scaleY: 1, duration: 0.7, ease: "power2.out" }, "-=0.3")
            .to(menuItems, {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .to(socialIcons, {
                x: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.3");

        if (isOpen) {
            tl.play();
            document.body.style.overflow = "hidden";
        } else {
            tl.reverse();
            document.body.style.overflow = "";
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

    const animateWave = () => {
        if (!waveRef.current) return;

        gsap.to(waveRef.current, {
            morphSVG: {
                shape: "M 0 100 Q 50 110, 100 100 T 200 100 T 300 100 Q 350 90, 400 100",
                type: "rotational"
            },
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    };

    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        onClose();
        // Add a small delay before navigation to allow the close animation to start
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    };

    // Don't render anything on the server
    if (!mounted) return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`liquid-portal ${isOpen ? 'open' : ''}`}
        >
            <div className="wave-container">
                <svg
                    ref={waveRef}
                    className="wave"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M 0 100 Q 50 80, 100 100 T 200 100 T 300 100 Q 350 120, 400 100"
                        fill="url(#gradient)"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(102, 252, 241, 0.2)" />
                            <stop offset="100%" stopColor="rgba(102, 252, 241, 0.05)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="close-button" onClick={onClose}>
                <div className="close-icon">
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div ref={contentRef} className="menu-content">
                <nav className="menu-nav">
                    <ul>
                        <li className={`menu-item ${currentSection === "About" ? "active" : ""}`}>
                            <a
                                href="#about"
                                onClick={(e) => handleLinkClick(e, "#about")}
                            >
                                <span className="menu-number">01</span>
                                <span className="menu-text">About</span>
                            </a>
                        </li>
                        <li className={`menu-item ${currentSection === "Work/Projects" ? "active" : ""}`}>
                            <a
                                href="#work"
                                onClick={(e) => handleLinkClick(e, "#work")}
                            >
                                <span className="menu-number">02</span>
                                <span className="menu-text">Work/Projects</span>
                            </a>
                        </li>
                        <li className={`menu-item ${currentSection === "Contact" ? "active" : ""}`}>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, "#contact")}
                            >
                                <span className="menu-number">03</span>
                                <span className="menu-text">Contact</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="social-links">
                    <h3>Connect With Me</h3>
                    <div className="social-icons-wrapper">
                        <a
                            href="https://github.com/Eanazir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/eyad-nazir/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://www.instagram.com/eyadakn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://x.com/Eyadakn1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="X (Twitter)"
                        >
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LiquidPortal; 