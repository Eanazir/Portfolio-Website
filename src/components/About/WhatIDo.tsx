import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface WhatIDoProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const WhatIDo = ({ sectionRef }: WhatIDoProps) => {
    const containerRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const setRef = (el: HTMLDivElement | null, index: number) => {
        containerRef.current[index] = el;
    };

    useEffect(() => {
        // Set loaded state after component mounts
        setIsLoaded(true);

        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

        // Handle touch devices
        containerRef.current.forEach((container) => {
            if (container && isTouchDevice) {
                container.classList.remove("whatNoTouch");
                container.addEventListener("click", () => handleClick(container));
            }
        });

        return () => {
            containerRef.current.forEach((container) => {
                if (container) {
                    container.removeEventListener("click", () => handleClick(container));
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
                            <div className="whatTags">RTOS</div>
                            <div className="whatTags">Microcontrollers</div>
                            <div className="whatTags">STM32</div>
                            <div className="whatTags">Arduino</div>
                            <div className="whatTags">Raspberry Pi</div>
                            <div className="whatTags">Embedded Linux</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* Firmware Development */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-2"
                    ref={(el) => setRef(el, 1)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">FIRMWARE DEVELOPMENT</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Building efficient, reliable firmware that powers specialized hardware systems.
                            Creating low-level software solutions that interact directly with electronic components.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">Bare-metal Programming</div>
                            <div className="whatTags">Interrupt Handling</div>
                            <div className="whatTags">Memory Management</div>
                            <div className="whatTags">Driver Development</div>
                            <div className="whatTags">Power Management</div>
                            <div className="whatTags">IAR Embedded Workbench</div>
                            <div className="whatTags">Keil</div>
                            <div className="whatTags">JTAG/SWD</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>

                {/* AI Integration */}
                <div
                    className="whatHorizontalItem whatNoTouch whatIDo-card whatIDo-card-3"
                    ref={(el) => setRef(el, 2)}
                >
                    <div className="whatCorner"></div>
                    <div className="whatContentIn">
                        <h3 className="whatIDo-card-title">AI INTEGRATION</h3>
                        <h4 className="whatIDo-card-subtitle">Description</h4>
                        <p className="whatIDo-card-description">
                            Implementing AI and machine learning algorithms on resource-constrained devices.
                            Enabling smart decision-making at the edge with optimized neural networks.
                        </p>
                        <h5 className="whatIDo-skills-title">Skillset & tools</h5>
                        <div className="whatContentFlex whatIDo-skills-container">
                            <div className="whatTags">TensorFlow Lite</div>
                            <div className="whatTags">Edge Computing</div>
                            <div className="whatTags">Computer Vision</div>
                            <div className="whatTags">ML Optimization</div>
                            <div className="whatTags">Quantization</div>
                            <div className="whatTags">Model Compression</div>
                            <div className="whatTags">Neural Networks</div>
                            <div className="whatTags">DSP</div>
                        </div>
                        <div className="whatArrow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
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