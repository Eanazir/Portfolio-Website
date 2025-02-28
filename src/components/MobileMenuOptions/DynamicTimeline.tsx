import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./DynamicTimeline.css";

interface DynamicTimelineProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const DynamicTimeline: React.FC<DynamicTimelineProps> = ({
    isOpen,
    onClose,
    currentSection
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState(currentSection);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setActiveSection(currentSection);
    }, [currentSection]);

    useEffect(() => {
        if (!menuRef.current) return;

        // Setup initial state
        gsap.set(menuRef.current, {
            autoAlpha: 0,
            x: "100%"
        });

        if (timelineRef.current) {
            const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
            const timelineLine = timelineRef.current.querySelector('.timeline-line');
            const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot');
            const socialIcons = menuRef.current.querySelectorAll('.social-icon');

            gsap.set(timelineItems, {
                x: 50,
                autoAlpha: 0
            });

            gsap.set(timelineLine, {
                scaleY: 0,
                transformOrigin: "top center"
            });

            gsap.set(timelineDots, {
                scale: 0,
                autoAlpha: 0
            });

            gsap.set(socialIcons, {
                y: 20,
                autoAlpha: 0
            });

            // Create animation
            const tl = gsap.timeline({ paused: true });
            tl.to(menuRef.current, {
                autoAlpha: 1,
                x: "0%",
                duration: 0.5,
                ease: "power3.out"
            })
                .to(timelineLine, {
                    scaleY: 1,
                    duration: 0.8,
                    ease: "power3.inOut"
                }, "-=0.2")
                .to(timelineDots, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .to(timelineItems, {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.7")
                .to(socialIcons, {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power3.out"
                }, "-=0.3");

            if (isOpen) {
                tl.play();
                document.body.style.overflow = "hidden";
            } else {
                gsap.to(menuRef.current, {
                    autoAlpha: 0,
                    x: "100%",
                    duration: 0.4,
                    ease: "power2.in"
                });
                document.body.style.overflow = "";
            }

            return () => {
                tl.kill();
            };
        }
    }, [isOpen]);

    // Track scroll position to update progress
    useEffect(() => {
        if (!isOpen || !timelineRef.current) return;

        const handleScroll = () => {
            if (!timelineRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
            setScrollPosition(scrollPercentage * 100);
        };

        timelineRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (timelineRef.current) {
                timelineRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isOpen]);

    const handleTimelineItemClick = (section: string, href: string) => {
        setActiveSection(section);
        onClose();
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    };

    if (!mounted) return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`dynamic-timeline-menu ${isOpen ? 'open' : ''}`}
        >
            <div className="timeline-header">
                <div className="timeline-title">
                    <h2>Navigation Journey</h2>
                    <div className="title-subtitle">Portfolio Sections</div>
                </div>
                <button className="close-button" onClick={onClose} aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className="progress-indicator">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${scrollPosition}%` }}
                    ></div>
                </div>
            </div>

            <div ref={timelineRef} className="timeline-container">
                <div className="timeline-line"></div>

                <div className="timeline-item-wrapper">
                    <div className="timeline-dot"></div>
                    <div
                        className={`timeline-item ${activeSection === 'About' ? 'active' : ''}`}
                        onClick={() => handleTimelineItemClick('About', '#about')}
                    >
                        <div className="timeline-date">01</div>
                        <div className="timeline-content">
                            <h3>About</h3>
                            <p>Get to know my background, skills, and experience as a creative professional.</p>
                            <div className="timeline-preview">
                                <div className="preview-indicator">
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                </div>
                                <div className="preview-text">Skills & Experience</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timeline-item-wrapper">
                    <div className="timeline-dot"></div>
                    <div
                        className={`timeline-item ${activeSection === 'Work/Projects' ? 'active' : ''}`}
                        onClick={() => handleTimelineItemClick('Work/Projects', '#work')}
                    >
                        <div className="timeline-date">02</div>
                        <div className="timeline-content">
                            <h3>Work/Projects</h3>
                            <p>Browse through my portfolio of design and development projects.</p>
                            <div className="timeline-preview">
                                <div className="preview-indicator">
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                </div>
                                <div className="preview-text">Portfolio Showcase</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timeline-item-wrapper">
                    <div className="timeline-dot"></div>
                    <div
                        className={`timeline-item ${activeSection === 'Contact' ? 'active' : ''}`}
                        onClick={() => handleTimelineItemClick('Contact', '#contact')}
                    >
                        <div className="timeline-date">03</div>
                        <div className="timeline-content">
                            <h3>Contact</h3>
                            <p>Reach out for collaboration opportunities or to discuss your project.</p>
                            <div className="timeline-preview">
                                <div className="preview-indicator">
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                </div>
                                <div className="preview-text">Get in Touch</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timeline-item-wrapper social-wrapper">
                    <div className="timeline-dot"></div>
                    <div className="timeline-item">
                        <div className="timeline-date">Connect</div>
                        <div className="timeline-content">
                            <div className="social-icons">
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
            </div>
        </div>,
        document.body
    );
};

export default DynamicTimeline; 