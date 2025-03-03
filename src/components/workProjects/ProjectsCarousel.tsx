import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/ProjectsCarousel.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ProjectsCarouselProps {
    sectionRef?: React.RefObject<HTMLDivElement>;
}

interface Project {
    id: number;
    title: string;
    role: string;
    period: string;
    description: string;
    image: string;
    fallbackImage: string;
    technologies: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Solar Tracker',
        role: 'Team Member',
        period: 'May 2023',
        description: 'Developed a low-cost, robust solar irradiance forecasting system integrating sky imaging and sensors.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        technologies: ['Machine Learning', 'IoT', 'Data Analysis']
    },
    {
        id: 2,
        title: 'Quadcopter Drone Project',
        role: 'Software Engineer',
        period: 'May 2022 – Present',
        description: 'Designed drone flight control circuit board and developed navigation software integrating GPS sensors.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        technologies: ['Circuit Design', 'GPS', 'Navigation']
    },
    {
        id: 3,
        title: 'Portfolio Website',
        role: 'Full-Stack Developer',
        period: '2023 – Present',
        description: 'Created a modern, responsive portfolio website using React, TypeScript, and GSAP animations.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        technologies: ['React', 'TypeScript', 'GSAP']
    },
    {
        id: 4,
        title: 'Integrated Retail POS',
        role: 'Project Manager',
        period: 'Sep. 2023 – Dec. 2023',
        description: 'Crafted a comprehensive POS application using React with a robust Express.js and PostgreSQL backend.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E",
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Node.js']
    }
];

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ sectionRef: _sectionRef }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!carouselRef.current || !containerRef.current || !projectsRef.current) return;

        let translateX: number = 0;

        const setTranslateX = () => {
            const boxes = document.querySelectorAll('.project-box');
            if (!boxes.length) return;

            const rect = boxes[0].getBoundingClientRect();
            const containerWidth = containerRef.current!.getBoundingClientRect().width;

            // Calculate how far to scroll horizontally
            translateX = (rect.width * boxes.length) - containerWidth + 100; // Add some padding
        };

        // Calculate initially
        setTranslateX();

        // Recalculate on resize
        window.addEventListener('resize', setTranslateX);

        // Create the timeline for horizontal scrolling
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: carouselRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
                id: 'projects-carousel'
            }
        });

        // Animate the project container horizontally
        timeline.to(projectsRef.current, {
            x: -translateX,
            ease: 'none',
            duration: 3
        });

        // Clean up
        return () => {
            window.removeEventListener('resize', setTranslateX);
            timeline.kill();
            ScrollTrigger.getById('projects-carousel')?.kill();
        };
    }, []);

    return (
        <div ref={carouselRef} className="projects-carousel-section" id="projects-carousel">
            <div ref={containerRef} className="projects-carousel-container">
                <h2 className="projects-carousel-title">
                    My <span>Projects</span>
                </h2>

                <div ref={projectsRef} className="projects-row">
                    {projects.map((project, index) => (
                        <div key={project.id} className="project-box">
                            <div className="project-info">
                                <div className="project-title">
                                    <h3>0{index + 1}</h3>
                                    <div>
                                        <h4>{project.title}</h4>
                                        <p>{project.role}</p>
                                    </div>
                                </div>
                                <h4>Tools and features</h4>
                                <p>{project.technologies.join(', ')}</p>
                            </div>

                            <div className="project-image">
                                <div className="project-image-wrapper">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        onError={(e) => {
                                            e.currentTarget.src = project.fallbackImage;
                                        }}
                                    />
                                    <a href="#" className="project-link">
                                        <div className="project-link-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsCarousel; 