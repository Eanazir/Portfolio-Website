import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Initialize scroll animations for the AboutMe section
 */
export function initAboutMeAnimations() {
    // Create timeline for section heading (01 and About me)
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about-creative",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    })
        .fromTo(
            "#about-creative .text-sm.uppercase.tracking-widest",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
        )
        .fromTo(
            "#about-creative .text-3xl.md\\:text-4xl",
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
        );

    // Create separate timeline for Creative Mind Technical Soul title
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about-creative .text-5xl.md\\:text-6xl",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    })
        .fromTo(
            "#about-creative .text-5xl.md\\:text-6xl",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(
            "#about-creative .text-5xl.md\\:text-6xl .text-\\[var\\(--accentColor\\)\\]",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power1.out" },
            "-=0.4"
        );

    // Animate paragraphs with staggered reveal
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about-creative p.text-lg, #about-creative p.text-xl",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    })
        .fromTo(
            "#about-creative p.text-lg, #about-creative p.text-xl",
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.6,
                ease: "power2.out"
            }
        );
}

/**
 * Initialize scroll animations for the WhatIDo section
 */
// export function initWhatIDoAnimations() {
//     // Create timeline for section heading (02 and Expertise) - match About Me style exactly
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: ".whatIDO",
//             start: "top 60%",
//             toggleActions: "play none none reverse"
//         }
//     })
//         .fromTo(
//             ".whatIDO h2.text-sm",
//             { x: -50, opacity: 0 },
//             { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
//         )
//         .fromTo(
//             ".whatIDO h3.text-3xl, .whatIDO h3.text-4xl",
//             { x: -30, opacity: 0 },
//             { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
//             "-=0.5"
//         );

//     // Force left alignment for the section heading and WHAT I DO title
//     const headingElements = document.querySelectorAll('.whatIDO h2, .whatIDO h3, .whatIDO .text-4xl, .whatIDO .text-5xl');
//     headingElements.forEach(element => {
//         (element as HTMLElement).style.textAlign = 'left';
//     });

//     // Match title animation exactly like the AboutMe section
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: ".whatIDO .text-4xl.md\\:text-5xl",
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//         }
//     })
//         .fromTo(
//             ".whatIDO .text-4xl.md\\:text-5xl",
//             { y: 50, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
//         )
//         .fromTo(
//             ".whatIDO .text-4xl.md\\:text-5xl span",
//             { opacity: 0, scale: 0.8 },
//             { opacity: 1, scale: 1, duration: 0.4, ease: "power1.out" },
//             "-=0.4"
//         );

//     // Match the container animation from About section
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: ".whatHorizontalContainer",
//             start: "top 70%",
//             toggleActions: "play none none reverse"
//         }
//     })
//         .fromTo(
//             ".whatHorizontalContainer",
//             { opacity: 0, y: 30 },
//             { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
//         );

//     // Add enhanced box animations
//     gsap.utils.toArray<HTMLElement>(".whatHorizontalItem").forEach((item, i) => {
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: item,
//                 start: "top 85%",
//                 toggleActions: "play none none none"
//             }
//         });

//         tl.fromTo(
//             item,
//             {
//                 y: 20,
//                 opacity: 0
//             },
//             {
//                 y: 0,
//                 opacity: 1,
//                 duration: 0.4,
//                 delay: i * 0.15, // Stagger based on index
//                 ease: "power1.out"
//             }
//         );
//     });
// }

/**
 * Create a smooth scroll progress indicator
 */
export function createScrollIndicator() {
    // Create a progress bar at the top of the screen
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';

    // Style the progress bar
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = 'var(--accentColor)';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'opacity 0.3s ease';

    // Add to DOM
    document.body.appendChild(progressBar);

    // Update progress bar width based on scroll position
    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const progress = Number(self.progress.toFixed(3)) * 100;
            gsap.to(progressBar, {
                width: `${progress}%`,
                duration: 0.3,
                overwrite: true,
                ease: 'power1.out'
            });
        }
    });
}

/**
 * Set up smooth scrolling for navigation links
 */
export function setupSmoothScrolling() {
    // Find all links that point to a section on the page
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            // Smooth scroll to target
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: targetId, offsetY: 50 },
                ease: 'power3.inOut'
            });
        });
    });
}

/**
 * Initialize all website scroll animations
 */
export function initScrollAnimations() {
    // Set up page progress indicator
    createScrollIndicator();

    // Set up smooth scrolling
    setupSmoothScrolling();

    // Set up AboutMe section animations
    initAboutMeAnimations();

    // Set up WhatIDo section animations
    // initWhatIDoAnimations();

    // Add hover effects for whatHorizontalItem elements
    const items = document.querySelectorAll('.whatHorizontalItem');

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                backgroundColor: 'rgba(151, 253, 247, 0.03)',
                borderColor: 'var(--accentColor)',
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('whatContentActive')) {
                gsap.to(item, {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 0.3
                });
            }
        });
    });
} 