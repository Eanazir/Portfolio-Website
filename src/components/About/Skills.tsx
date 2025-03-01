import { motion } from 'framer-motion';

interface SkillsProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const Skills = ({ sectionRef }: SkillsProps) => {
    // Skills data for visualization
    const skills = [
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "TS" },
        { name: "Next.js", icon: "N" },
        { name: "Tailwind", icon: "🌊" },
        { name: "Framer Motion", icon: "🔄" },
        { name: "Three.js", icon: "3D" },
        { name: "UI/UX", icon: "🎨" },
        { name: "Figma", icon: "F" }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-12 flex flex-col justify-center"
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-6 md:mb-10"
            >
                <h2 className="text-sm uppercase tracking-widest text-[var(--accentColor)] mb-1 md:mb-2">02</h2>
                <div className="flex items-center mb-4 md:mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">Skills</h3>
                    <div className="h-px bg-white/10 flex-grow ml-6"></div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex flex-col items-center"
            >
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Combining technical expertise with creative vision to deliver cutting-edge digital experiences.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 w-full">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-3 md:p-5 
                                flex flex-col items-center justify-center text-center
                                hover:border-[var(--accentColor)]/40 transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-2xl md:text-3xl mb-2 md:mb-3">{skill.icon}</div>
                            <h4 className="text-sm md:text-base text-white font-medium">{skill.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills; 