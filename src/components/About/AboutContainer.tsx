import { useRef } from 'react';
import AboutMe from './AboutMe';
import WhatIDo from './WhatIDo';

const AboutContainer = () => {
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const whatIDoRef = useRef<HTMLDivElement>(null);

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