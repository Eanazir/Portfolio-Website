import { useRef, useEffect } from 'react';
import CareerTimeline from './CareerTimeline';
import ProjectsCarousel from './ProjectsCarousel';
import { initScrollAnimations } from '../utils/scrollAnimations';

const WorkProjectsContainer = () => {
    const careerTimelineRef = useRef<HTMLDivElement>(null);

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
        >
            <div className="container mx-auto px-4 md:px-8">
                <div>
                    <CareerTimeline sectionRef={careerTimelineRef} />
                </div>
            </div>
            <div className="pb-16">
                <ProjectsCarousel />
            </div>
        </div>
    );
};

export default WorkProjectsContainer; 