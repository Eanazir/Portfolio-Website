import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./styles/MobileMenu.css";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentSection }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const wavesRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Create wave animation effect
    useEffect(() => {
        if (!wavesRef.current || !isOpen) return;

        // Clear any existing wave SVGs
        while (wavesRef.current.firstChild) {
            wavesRef.current.removeChild(wavesRef.current.firstChild);
        }

        // Create the SVG container
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 1440 300");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.classList.add("waves-svg");

        // Create multiple wave paths with different animations
        const waveColors = [
            { color: "rgba(102, 252, 241, 0.05)", delay: 0 },
            { color: "rgba(102, 252, 241, 0.08)", delay: 0.5 },
            { color: "rgba(102, 252, 241, 0.12)", delay: 0.3 }
        ];

        waveColors.forEach((wave, index) => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", wave.color);
            path.classList.add("wave-path");

            // Using different path data for each wave to create varied effect
            if (index === 0) {
                path.setAttribute("d", "M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,218.7C672,213,768,171,864,160C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
            } else if (index === 1) {
                path.setAttribute("d", "M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,122.7C672,107,768,85,864,90.7C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
            } else {
                path.setAttribute("d", "M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
            }

            svg.appendChild(path);

            // Animate each wave
            gsap.fromTo(
                path,
                {
                    attr: { opacity: 0 },
                    y: 50
                },
                {
                    attr: { opacity: 1 },
                    y: 0,
                    duration: 1,
                    delay: wave.delay,
                    ease: "power2.out"
                }
            );

            // Add flowing animation
            gsap.to(path, {
                x: -80,
                repeat: -1,
                duration: 15 + index * 3,
                ease: "sine.inOut",
                yoyo: true
            });
        });

        wavesRef.current.appendChild(svg);
    }, [isOpen, mounted]);

    // Main menu animation
    useEffect(() => {
        if (!menuRef.current) return;

        const tl = gsap.timeline({ paused: true });
        const menuItems = menuRef.current.querySelectorAll(".menu-item");
        const socialIcons = menuRef.current.querySelectorAll(".social-icon");
        const menuTitle = menuRef.current.querySelector(".menu-title");
        const menuUnderline = menuRef.current.querySelector(".menu-title-underline");

        // Reset positions
        gsap.set(menuRef.current, { x: "100%" });
        gsap.set(menuItems, { x: 50, opacity: 0 });
        gsap.set(socialIcons, { x: 50, opacity: 0 });
        gsap.set(menuTitle, { y: -20, opacity: 0 });
        gsap.set(menuUnderline, { width: 0, opacity: 0 });

        // Create main animation sequence
        tl.to(menuRef.current, {
            x: "0%",
            duration: 0.75,
            ease: "expo.out"
        })
            .to(menuTitle, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.2)"
            }, "-=0.4")
            .to(menuUnderline, {
                width: 40,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.2")
            .to(menuItems, {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.3")
            .to(socialIcons, {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");

        // Handle menu open/close
        if (isOpen) {
            document.body.style.overflow = "hidden";
            tl.play();
        } else {
            // Create a faster exit animation
            const exitTl = gsap.timeline();

            exitTl.to([menuItems, socialIcons, menuTitle], {
                x: 30,
                opacity: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "power1.in"
            }, 0)
                .to(menuRef.current, {
                    x: "100%",
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        document.body.style.overflow = "";
                    }
                }, 0.2);
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

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
            className={`mobile-menu ${isOpen ? 'open' : ''}`}
        >
            <div className="close-button" onClick={onClose}>
                <div className="close-icon">
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div ref={contentRef} className="menu-content">
                <h1 className="menu-title">
                    Menu
                    <span className="menu-title-underline"></span>
                </h1>

                <div className="menu-sections">
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
                        <div className="wave-container" ref={wavesRef}></div>
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
            </div>
        </div>,
        document.body
    );
};

export default MobileMenu;