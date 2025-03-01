import React, { useRef } from 'react';
import AboutMe from './AboutMe';
import WhatIDo from './WhatIDo';
import Journey from './Journey';
import Interests from './Interests';

const AboutSection = () => {
    // Create refs for each section
    const containerRef = useRef<HTMLDivElement>(null);
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const whatIDoRef = useRef<HTMLDivElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const interestsRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="relative"
            id="about-creative"
        >
            <div className="container mx-auto px-4 md:px-8">
                <div>
                    <AboutMe sectionRef={aboutMeRef} />
                    <WhatIDo sectionRef={whatIDoRef} />
                    {/* <Journey sectionRef={journeyRef} />
                    <Interests sectionRef={interestsRef} /> */}
                </div>
            </div>
        </div>
    );
};

export default AboutSection; 