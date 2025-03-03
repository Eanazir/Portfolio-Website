import { motion } from 'framer-motion';
import { useEffect } from 'react';
import CodeTypingAnimation from './CodeTypingAnimation';
import { MorphingText } from '../utils/MorphingText';
import { initScrollAnimations } from '../utils/scrollAnimations';
interface AboutMeProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const AboutMe = ({ sectionRef }: AboutMeProps) => {
    useEffect(() => {
        initScrollAnimations();
    }, []);
    return (
        <section
            ref={sectionRef}
            className="py-12 flex flex-col justify-center"
            id="aboutMe"
        >
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-4"
                >
                    <h2 className="text-sm uppercase tracking-widest text-[var(--accentColor)] mb-0 md:mb-2 text-left">01</h2>
                    <div className="flex items-center mb-6 md:mb-4 ">
                        <h3 className="text-3xl md:text-4xl font-bold text-white">About me</h3>
                        <div className="h-px bg-white/10 flex-grow ml-6"></div>
                    </div>
                </motion.div>
                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <MorphingText texts={["Creative Mind", "Technical Soul"]} highlightWords={["Mind", "Soul"]} />
                </motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-full mx-auto flex-grow"
            >
                {/* Grid layout for text and animation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
                    {/* Text content on the left */}
                    <div className="space-y-6 aboutMeText">
                        <p className="text-lg lg:text-[1.20rem] xl:text-[1.35rem] text-white font-semibold leading-relaxed">
                        Hello! I am a creative developer and
                        designer with an enthusiasm for blending
                        my technical expertise with my artistic
                        creativity to craft experiences that
                        resonate and astound.
                        </p>
                        <p className="text-lg lg:text-[1.20rem] xl:text-[1.35rem] text-white font-semibold leading-relaxed">
                        I recently graduated in 2024 from <a href="https://www.tamu.edu" target="_blank" rel="noopener noreferrer" className="text-[var(--accentColor)] hover:underline transition-all">Texas A&M University</a>,
                        Summa Cum Laude, in computer Engineering. This allows me to
                        bring fresh perspectives and innovative
                        ideas to projects.                        
                        </p>
                        <p className="text-lg lg:text-[1.20rem] xl:text-[1.35rem] text-white font-semibold leading-relaxed">
                        My true passion lies in embedded
                        software engineering and Artificial
                        intelligence. I have been enthusiastic about these
                        subjects since I was young which led me to obtain a degree in computer
                        engineering. I am still constantly seeking
                        to expand my technical skills and push
                        creative boundaries to satisfy my
                        curiosity.                        
                        </p>
                    </div>

                    {/* Code Typing Animation on the right */}
                    <div className="h-[370px]">
                        <CodeTypingAnimation />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutMe; 