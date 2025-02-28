import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import "./ImmersiveSphere.css";

interface ImmersiveSphereProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
}

const ImmersiveSphere: React.FC<ImmersiveSphereProps> = ({ isOpen, onClose, currentSection }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            // Only update if we have valid data
            if (event.beta !== null && event.gamma !== null) {
                setDeviceOrientation({
                    beta: event.beta, // -180 to 180 (front/back tilt)
                    gamma: event.gamma // -90 to 90 (left/right tilt)
                });
            }
        };

        window.addEventListener('deviceorientation', handleDeviceOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!menuRef.current || !sphereRef.current) return;

        // Create particles
        if (particlesRef.current) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                // Random positions
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const z = Math.random() * 100 - 50;

                // Random size
                const size = Math.random() * 5 + 1;

                // Set styles
                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.transform = `translateZ(${z}px)`;

                particlesRef.current.appendChild(particle);
            }
        }

        // Animation timeline
        const tl = gsap.timeline({ paused: true });

        // Initialize positions
        gsap.set(menuRef.current, {
            autoAlpha: 0
        });

        gsap.set(sphereRef.current, {
            scale: 0,
            autoAlpha: 0
        });

        const menuItems = menuRef.current.querySelectorAll('.menu-item');
        gsap.set(menuItems, {
            y: 20,
            autoAlpha: 0
        });

        const socialItems = menuRef.current.querySelectorAll('.social-item');
        gsap.set(socialItems, {
            scale: 0,
            autoAlpha: 0
        });

        // Create animation
        tl.to(menuRef.current, {
            autoAlpha: 1,
            duration: 0.3
        })
            .to(sphereRef.current, {
                scale: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.1")
            .to(menuItems, {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.4")
            .to(socialItems, {
                scale: 1,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "back.out(1.7)"
            }, "-=0.3");

        if (isOpen) {
            tl.play();
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(menuRef.current, {
                autoAlpha: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.set(sphereRef.current, { scale: 0, autoAlpha: 0 });
                    gsap.set(menuItems, { y: 20, autoAlpha: 0 });
                    gsap.set(socialItems, { scale: 0, autoAlpha: 0 });
                }
            });
            document.body.style.overflow = "";
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

    // Update sphere position based on device orientation
    useEffect(() => {
        if (!sphereRef.current || !isOpen) return;

        // Limit the movement range
        const { beta, gamma } = deviceOrientation;
        const maxShift = 15; // pixels

        // Calculate shift based on orientation (with limits)
        const xShift = (gamma / 90) * maxShift;
        const yShift = (beta / 180) * maxShift;

        gsap.to(sphereRef.current, {
            x: xShift,
            y: yShift,
            duration: 1,
            ease: "power2.out"
        });
    }, [deviceOrientation, isOpen]);

    const handleMenuItemClick = (href: string) => {
        onClose();
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    };

    if (!mounted) return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`immersive-sphere-menu ${isOpen ? 'open' : ''}`}
        >
            <div
                ref={sphereRef}
                className="sphere-container"
            >
                <div className="sphere-inner">
                    <div className="sphere-content">
                        <button className="close-button" onClick={onClose} aria-label="Close menu">
                            <span></span>
                            <span></span>
                        </button>

                        <nav className="menu-navigation">
                            <ul>
                                <li
                                    className={`menu-item ${currentSection === 'About' ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('#about')}
                                >
                                    <div className="menu-item-inner">
                                        <span className="item-number">01.</span>
                                        <span className="item-text">About</span>
                                    </div>
                                </li>
                                <li
                                    className={`menu-item ${currentSection === 'Work/Projects' ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('#work')}
                                >
                                    <div className="menu-item-inner">
                                        <span className="item-number">02.</span>
                                        <span className="item-text">Work/Projects</span>
                                    </div>
                                </li>
                                <li
                                    className={`menu-item ${currentSection === 'Contact' ? 'active' : ''}`}
                                    onClick={() => handleMenuItemClick('#contact')}
                                >
                                    <div className="menu-item-inner">
                                        <span className="item-number">03.</span>
                                        <span className="item-text">Contact</span>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <div className="social-container">
                            <a
                                href="https://github.com/Eanazir"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-item"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/eyad-nazir/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-item"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="https://www.instagram.com/eyadakn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-item"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://x.com/Eyadakn1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-item"
                                aria-label="X (Twitter)"
                            >
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={particlesRef} className="particles-container"></div>

            <div className="orbital-ring"></div>
            <div className="orbital-ring orbital-ring-2"></div>
        </div>,
        document.body
    );
};

export default ImmersiveSphere; 