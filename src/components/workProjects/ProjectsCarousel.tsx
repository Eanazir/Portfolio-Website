import "./styles/ProjectsCarousel.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
        image: "/solar_tracker.jpg",
        fallbackImage: "/solar_tracker.jpg",
        technologies: ['Machine Learning', 'IoT', 'Data Analysis']
    },
    {
        id: 2,
        title: 'Quadcopter Drone Project',
        role: 'Software Engineer',
        period: 'May 2022 – Present',
        description: 'Designed drone flight control circuit board and developed navigation software integrating GPS sensors.',
        image: "/drone.jpg",
        fallbackImage: "/drone.jpg",
        technologies: ['Circuit Design', 'GPS', 'Navigation']
    },
    {
        id: 3,
        title: 'Portfolio Website',
        role: 'Full-Stack Developer',
        period: '2023 – Present',
        description: 'Created a modern, responsive portfolio website using React, TypeScript, and GSAP animations.',
        image: "/portfolio.png",
        fallbackImage: "/portfolio.png",
        technologies: ['React', 'TypeScript', 'GSAP']
    },
    {
        id: 4,
        title: 'Integrated Retail POS',
        role: 'Project Manager',
        period: 'Sep. 2023 – Dec. 2023',
        description: 'Crafted a comprehensive POS application using React with a robust Express.js and PostgreSQL backend.',
        image: "/POS.png",
        fallbackImage: "/POS.png",
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Node.js']
    }
];

const ProjectsCarousel = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const section = sectionRef.current;
        const container = containerRef.current;

        // Kill any existing ScrollTriggers to prevent duplicates
        ScrollTrigger.getAll().forEach(st => st.kill());

        let translateX: number = 0;

        function setTranslateX() {
            const boxes = section.getElementsByClassName("project-box");
            if (!boxes.length) return;

            const rectLeft = container.getBoundingClientRect().left;
            const rect = boxes[0].getBoundingClientRect();
            const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
            const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2;
            translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding;
        }

        setTranslateX();

        // Update translateX on window resize
        window.addEventListener('resize', setTranslateX);

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${translateX}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: true,
                markers: false,
            },
        });

        timeline.to(".projects-flex", {
            x: -translateX,
            ease: "none",
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', setTranslateX);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="projects-section" id="projects" ref={sectionRef}>
            <div className="projects-container section-container" ref={containerRef}>
                <h2>
                    My <span>Projects</span>
                </h2>
                <div className="projects-flex">
                    {projects.map((project) => (
                        <div className="project-box" key={project.id}>
                            <div className="project-info">
                                <div className="project-title">
                                    <h3>0{project.id}</h3>
                                    <div>
                                        <h4>{project.title}</h4>
                                        <p>{project.role}</p>
                                    </div>
                                </div>
                                <h4>Technologies</h4>
                                <p>{project.technologies.join(', ')}</p>
                                <h4>Description</h4>
                                <p>{project.description}</p>
                            </div>
                            <div className="project-image">
                                <div className="project-image-in">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = project.fallbackImage;
                                        }}
                                    />
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
