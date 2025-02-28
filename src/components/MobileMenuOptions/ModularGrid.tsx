import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./ModularGrid.css";

interface ModularGridProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const ModularGrid: React.FC<ModularGridProps> = ({ isOpen, onClose, currentSection }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState(currentSection);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setActiveSection(currentSection);
    }, [currentSection]);

    useEffect(() => {
        if (!menuRef.current) return;

        // Initialize the menu position
        gsap.set(menuRef.current, {
            autoAlpha: 0,
            x: "100%"
        });

        const gridItems = menuRef.current.querySelectorAll('.grid-item');
        gsap.set(gridItems, {
            autoAlpha: 0,
            scale: 0.8,
        });

        // Animation for menu open/close
        const tl = gsap.timeline({ paused: true });

        tl.to(menuRef.current, {
            autoAlpha: 1,
            x: "0%",
            duration: 0.5,
            ease: "power3.out"
        })
            .to(gridItems, {
                autoAlpha: 1,
                scale: 1,
                stagger: 0.05,
                duration: 0.4,
                ease: "back.out(1.7)"
            }, "-=0.2");

        if (isOpen) {
            tl.play();
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(menuRef.current, {
                autoAlpha: 0,
                x: "100%",
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(gridItems, {
                        autoAlpha: 0,
                        scale: 0.8
                    });
                }
            });
            document.body.style.overflow = "";
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

    const handleSectionClick = (section: string, href: string) => {
        setActiveSection(section);
        setTimeout(() => {
            onClose();
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }, 100);
    };

    if (!mounted) return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`modular-grid-menu ${isOpen ? 'open' : ''}`}
        >
            <div className="grid-overlay"></div>

            <div className="menu-header">
                <div className="menu-title">
                    <div className="title-line"></div>
                    <h2>Navigation</h2>
                    <div className="title-line"></div>
                </div>
                <button className="close-btn" onClick={onClose} aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div ref={contentRef} className="menu-grid">
                <div
                    className={`grid-item ${activeSection === 'About' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('About', '#about')}
                >
                    <div className="grid-item-content">
                        <span className="grid-item-number">01</span>
                        <h3>About</h3>
                        <div className="grid-item-decorator"></div>
                        <p>Learn about my skills, experience, and background</p>
                    </div>
                </div>

                <div
                    className={`grid-item ${activeSection === 'Work/Projects' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('Work/Projects', '#work')}
                >
                    <div className="grid-item-content">
                        <span className="grid-item-number">02</span>
                        <h3>Work/Projects</h3>
                        <div className="grid-item-decorator"></div>
                        <p>Explore my portfolio of design and development projects</p>
                    </div>
                </div>

                <div
                    className={`grid-item ${activeSection === 'Contact' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('Contact', '#contact')}
                >
                    <div className="grid-item-content">
                        <span className="grid-item-number">03</span>
                        <h3>Contact</h3>
                        <div className="grid-item-decorator"></div>
                        <p>Get in touch for collaborations or opportunities</p>
                    </div>
                </div>

                <div className="grid-item social">
                    <div className="grid-item-content">
                        <h3>Connect</h3>
                        <div className="social-grid">
                            <a
                                href="https://github.com/Eanazir"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="social-grid-item"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/eyad-nazir/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="social-grid-item"
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="https://www.instagram.com/eyadakn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="social-grid-item"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://x.com/Eyadakn1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="social-grid-item"
                            >
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid-background">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="grid-background-cell"></div>
                ))}
            </div>
        </div>,
        document.body
    );
};

export default ModularGrid; 