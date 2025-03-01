import { motion } from 'framer-motion';
import CodeTypingAnimation from './CodeTypingAnimation';

interface AboutMeProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const AboutMe = ({ sectionRef }: AboutMeProps) => {
    return (
        <section
            ref={sectionRef}
            className="py-12 flex flex-col justify-center"
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
                    Creative <span className="text-[var(--accentColor)]">Mind</span>.
                    <br />
                    Technical <span className="text-[var(--accentColor)]">Soul</span>.
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
                    <div className="space-y-6">
                        <p className="text-xl text-white font-semibold leading-relaxed">
                            I'm a creative developer & designer with a passion for blending technical expertise with artistic vision, crafting experiences that resonate and inspire.
                        </p>
                        <p className="text-lg text-white font-semibold leading-relaxed">
                            Recently graduated from <a href="https://www.tamu.edu" target="_blank" rel="noopener noreferrer" className="text-[var(--accentColor)] hover:underline transition-all">Texas A&M University</a> with Summa Cum Laude honors in Computer Engineering, I bring fresh perspectives and innovative approaches to every project.
                        </p>
                        <p className="text-lg text-white font-semibold leading-relaxed">
                            My passion lies in embedded software engineering and artificial intelligence—fields I've been enthusiastically exploring long before they became mainstream. Driven by curiosity, I constantly seek to expand my skills and push creative boundaries.
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