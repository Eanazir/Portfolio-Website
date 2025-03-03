import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Extend HTMLDivElement to include clickHandler property
interface ExtendedHTMLDivElement extends HTMLDivElement {
    clickHandler?: () => void;
}

interface WhatIDoProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const WhatIDo = ({ sectionRef }: WhatIDoProps) => {
    const containerRef = useRef<(ExtendedHTMLDivElement | null)[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const setRef = (el: ExtendedHTMLDivElement | null, index: number) => {
        containerRef.current[index] = el;
    };

    useEffect(() => {
        // Set loaded state after component mounts
        setIsLoaded(true);

        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

        // Define event handlers
        const handleTouchStart = (e: TouchEvent) => {
            // Prevent default scrolling behavior inside cards
            e.preventDefault();
            e.stopPropagation();
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent default scrolling behavior on move
            e.preventDefault();
            e.stopPropagation();
        };

        // Handle touch devices
        containerRef.current.forEach((container) => {
            if (container && isTouchDevice) {
                container.classList.remove("whatNoTouch");

                // Add touch event listeners
                container.addEventListener("touchstart", handleTouchStart, { passive: false });
                container.addEventListener("touchmove", handleTouchMove, { passive: false });

                // Each container needs its own click handler
                const clickHandler = () => handleClick(container);
                // Store the handler on the element for removal later
                container.clickHandler = clickHandler;
                container.addEventListener("click", clickHandler);
            }
        });

        return () => {
            containerRef.current.forEach((container) => {
                if (container) {
                    // Remove click handler using the stored reference
                    if (container.clickHandler) {
                        container.removeEventListener("click", container.clickHandler);
                        delete container.clickHandler;
                    }

                    // Remove touch handlers
                    if (isTouchDevice) {
                        container.removeEventListener("touchstart", handleTouchStart);
                        container.removeEventListener("touchmove", handleTouchMove);
                    }
                }
            });
        };
    }, []);

    return (
        <section id="whatIDo" ref={sectionRef} className="py-16 lg:py-8 flex flex-col justify-center">
            {/* Section heading with "02" */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-4 md:mb-6 whatIDo-header"
            >
                <h2 className="text-sm uppercase tracking-widest text-[var(--accentColor)] mb-1 whatIDo-section-number">02</h2>
                <div className="flex items-center mb-3 md:mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white whatIDo-section-title">Expertise</h3>
                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                </div>
            </motion.div>

            {/* Centered WHAT I DO title */}
            <div className="text-center md:text-center text-left mb-8 md:mb-10 whatIDo-title-container">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight whatIDo-main-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    WHAT <span className="text-[var(--accentColor)] whatIDo-highlight">I DO</span>
                </motion.h1>
            </div>

            {/* Vertical boxes */}
            <div className={`whatHorizontalContainer whatIDo-cards-container ${isLoaded ? 'is-loaded' : ''}`}>
                {/* Embedded Systems */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-1"
                    ref={(el) => setRef(el, 0)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">EMBEDDED SYSTEMS</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Creating intelligent, responsive embedded systems that integrate seamlessly with hardware.
                            Developing solutions that optimize performance, power consumption, and reliability.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">C/C++</div>
                            <div className="whatTags">ARM Cortex</div>
                            <div className="whatTags">FreeRTOS</div>
                            <div className="whatTags">Microcontrollers</div>
                            <div className="whatTags">Verilog</div>
                            <div className="whatTags">VHDL</div>
                            <div className="whatTags">LTspice</div>
                            <div className="whatTags">Arduino</div>
                            <div className="whatTags">Cadence</div>
                            <div className="whatTags">MultiSim</div>
                            <div className="whatTags">FPGA</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* Software Development */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-2"
                    ref={(el) => setRef(el, 1)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">SOFTWARE DEVELOPMENT</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Building efficient, scalable software applications with a focus on performance and reliability.
                            Creating solutions for diverse platforms from low-level systems to high-level applications.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">Java</div>
                            <div className="whatTags">Python</div>
                            <div className="whatTags">C/C++</div>
                            <div className="whatTags">C#</div>
                            <div className="whatTags">.NET</div>
                            <div className="whatTags">Go</div>
                            <div className="whatTags">Data Structures</div>
                            <div className="whatTags">Algorithms</div>
                            <div className="whatTags">Ruby</div>
                            <div className="whatTags">Lua</div>
                            <div className="whatTags">Swift</div>
                            <div className="whatTags">Assembly</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* Web Development */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-3"
                    ref={(el) => setRef(el, 2)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">WEB DEVELOPMENT</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Creating responsive and interactive web applications with modern frameworks.
                            Building full-stack solutions that combine robust backends with engaging user interfaces.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">React</div>
                            <div className="whatTags">Angular</div>
                            <div className="whatTags">Express.js</div>
                            <div className="whatTags">Node.js</div>
                            <div className="whatTags">Next.js</div>
                            <div className="whatTags">Tailwind CSS</div>
                            <div className="whatTags">Three.js</div>
                            <div className="whatTags">GSAP</div>
                            <div className="whatTags">Framer Motion</div>
                            <div className="whatTags">HTML</div>
                            <div className="whatTags">PERN Stack</div>
                            <div className="whatTags">PostgreSQL</div>
                            <div className="whatTags">SQL</div>
                            <div className="whatTags">Docker</div>
                            <div className="whatTags">UX Design</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* Data & Analytics */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-4"
                    ref={(el) => setRef(el, 3)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">DATA & ANALYTICS</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Analyzing and visualizing complex data to extract meaningful insights.
                            Implementing machine learning models to solve real-world problems with data-driven approaches.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">Machine Learning</div>
                            <div className="whatTags">Data Analytics</div>
                            <div className="whatTags">R</div>
                            <div className="whatTags">Python</div>
                            <div className="whatTags">Tableau</div>
                            <div className="whatTags">Knime</div>
                            <div className="whatTags">SQL</div>
                            <div className="whatTags">Statistics</div>
                            <div className="whatTags">Probability</div>
                            <div className="whatTags">NLP</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* AI Integration */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-5"
                    ref={(el) => setRef(el, 4)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">AI INTEGRATION</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Implementing AI and machine learning algorithms for various applications from edge devices to cloud.
                            Enabling smart decision-making with optimized neural networks and NLP models.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">TensorFlow</div>
                            <div className="whatTags">Edge Computing</div>
                            <div className="whatTags">Computer Vision</div>
                            <div className="whatTags">ML Optimization</div>
                            <div className="whatTags">Natural Language Processing</div>
                            <div className="whatTags">Model Compression</div>
                            <div className="whatTags">Neural Networks</div>
                            <div className="whatTags">DSP</div>
                            <div className="whatTags">Word Cloud Analysis</div>
                            <div className="whatTags">Digital Twin</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIDo;

function handleClick(container: ExtendedHTMLDivElement) {
    container.classList.toggle("whatContentActive");
    container.classList.remove("whatSibling");
    if (container.parentElement) {
        const siblings = Array.from(container.parentElement.children).filter(
            child => child !== container && child.classList.contains("whatHorizontalItem")
        );
        siblings.forEach(sibling => {
            sibling.classList.add("whatSibling");
            sibling.classList.remove("whatContentActive");
        });
    }
}