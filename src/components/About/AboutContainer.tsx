import { useRef, useEffect } from 'react';
import AboutMe from './AboutMe';
import WhatIDo from './WhatIDo';
import { initScrollAnimations } from '../../utils/scrollAnimations';

const AboutContainer = () => {
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const whatIDoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize scroll animations when component mounts
        initScrollAnimations();

        // Clean up any animations when component unmounts
        return () => {
            // Kill any active GSAP animations to prevent memory leaks
            const scrollTriggers = document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end');
            scrollTriggers.forEach(marker => marker.remove());
        };
    }, []);

    return (
        <div
            className="relative"
            id="about-creative"
        >
            <div className="container mx-auto px-4 md:px-8">
                <div>
                    <AboutMe sectionRef={aboutMeRef} />
                    <WhatIDo sectionRef={whatIDoRef} />
                </div>
            </div>
        </div>
    );
};

export default AboutContainer; 