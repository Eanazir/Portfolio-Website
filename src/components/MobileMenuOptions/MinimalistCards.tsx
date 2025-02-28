import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./MinimalistCards.css";

interface MinimalistCardsProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const MinimalistCards: React.FC<MinimalistCardsProps> = ({
    isOpen,
    onClose,
    currentSection
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    // Map currentSection to card index
    const getSectionIndex = () => {
        switch (currentSection) {
            case 'About': return 0;
            case 'Work/Projects': return 1;
            case 'Contact': return 2;
            default: return null;
        }
    };

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setActiveCard(getSectionIndex());
        }
    }, [isOpen, currentSection]);

    useEffect(() => {
        if (!menuRef.current) return;

        // Animation for open/close
        const tl = gsap.timeline({ paused: true });

        // Initial state
        gsap.set(menuRef.current, { autoAlpha: 0, x: '100%' });

        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.card');
            gsap.set(cards, {
                x: 100,
                autoAlpha: 0,
                rotation: 5,
                transformOrigin: "center center"
            });

            const socialItems = menuRef.current.querySelectorAll('.social-icon');
            gsap.set(socialItems, { y: 20, autoAlpha: 0 });

            // Create animation
            tl.to(menuRef.current, {
                autoAlpha: 1,
                x: '0%',
                duration: 0.4,
                ease: "power3.out"
            })
                .to(cards, {
                    x: 0,
                    autoAlpha: 1,
                    rotation: 0,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, "-=0.2")
                .to(socialItems, {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: "power2.out"
                }, "-=0.3");
        }

        if (isOpen) {
            tl.play();
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(menuRef.current, {
                autoAlpha: 0,
                x: '100%',
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setActiveCard(null);
                }
            });
            document.body.style.overflow = "";
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

    const handleCardClick = (index: number, href: string) => {
        if (activeCard === index) {
            // Navigate if already active
            onClose();
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        } else {
            // Otherwise just activate the card
            setActiveCard(index);
        }
    };

    const handleSwipeDown = () => {
        onClose();
    };

    useEffect(() => {
        if (!isOpen) return;

        let startY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;

            // If swiping down with significant movement
            if (diff > 100) {
                handleSwipeDown();
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const navItems = [
        { id: 0, title: 'About', href: '#about', description: 'Learn more about my background, skills, and experience as a creative designer and developer.' },
        { id: 1, title: 'Work/Projects', href: '#work', description: 'Explore my portfolio of selected projects and case studies in design and development.' },
        { id: 2, title: 'Contact', href: '#contact', description: 'Get in touch for collaborations, opportunities, or just to say hello.' }
    ];

    return createPortal(
        <div
            ref={menuRef}
            className={`minimalist-cards-menu ${isOpen ? 'open' : ''}`}
        >
            <div className="menu-header">
                <div className="menu-title">Menu</div>
                <button className="close-button" onClick={onClose} aria-label="Close menu">
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className="card-progress">
                {navItems.map((item, index) => (
                    <div
                        key={`progress-${item.id}`}
                        className={`progress-dot ${activeCard === index ? 'active' : ''}`}
                        onClick={() => setActiveCard(index)}
                    ></div>
                ))}
            </div>

            <div className="swipe-indicator">
                <div className="swipe-line"></div>
                <span>Swipe down to close</span>
            </div>

            <div ref={cardsRef} className="cards-container">
                {navItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`card ${activeCard === index ? 'active' : ''}`}
                        onClick={() => handleCardClick(index, item.href)}
                    >
                        <div className="card-header">
                            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="card-title">{item.title}</h3>
                        </div>
                        <div className="card-body">
                            <p>{item.description}</p>
                            <div className="card-cta">
                                {activeCard === index && (
                                    <span className="tap-indicator">Tap again to navigate</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="social-container">
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
        </div>,
        document.body
    );
};

export default MinimalistCards; 