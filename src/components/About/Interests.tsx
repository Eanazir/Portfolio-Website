import { motion } from 'framer-motion';

interface InterestsProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const Interests = ({ sectionRef }: InterestsProps) => {
    const interests = [
        { name: "Digital Art", icon: "🎨", desc: "Creating digital illustrations and generative art" },
        { name: "Photography", icon: "📸", desc: "Capturing moments and exploring visual storytelling" },
        { name: "Music Production", icon: "🎵", desc: "Composing and producing electronic music" },
        { name: "Travel", icon: "✈️", desc: "Exploring new cultures and finding inspiration" },
        { name: "Reading", icon: "📚", desc: "Science fiction, design theory, and biographies" },
        { name: "Gaming", icon: "🎮", desc: "Both playing and analyzing game design principles" },
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
                <h2 className="text-sm uppercase tracking-widest text-[var(--accentColor)] mb-1 md:mb-2">04</h2>
                <div className="flex items-center mb-4 md:mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">Interests</h3>
                    <div className="h-px bg-white/10 flex-grow ml-6"></div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Beyond coding, these are the passions that fuel my creativity and inspiration.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{ y: -10, backgroundColor: 'rgba(151, 253, 247, 0.05)' }}
                            className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:border-[var(--accentColor)]/40"
                        >
                            <div className="text-3xl md:text-4xl mb-3 md:mb-4">{interest.icon}</div>
                            <h3 className="text-lg md:text-xl text-white font-medium mb-2">{interest.name}</h3>
                            <p className="text-sm md:text-base text-white/70">{interest.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Interests; 