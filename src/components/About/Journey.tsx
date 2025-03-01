import { motion } from 'framer-motion';

interface JourneyProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const Journey = ({ sectionRef }: JourneyProps) => {
    // Timeline data for education/experience
    const timelineData = [
        {
            year: "2023",
            title: "Senior Creative Developer",
            description: "Leading the development of immersive web experiences",
        },
        {
            year: "2021",
            title: "Interactive Developer",
            description: "Creating award-winning interactive websites and applications",
        },
        {
            year: "2019",
            title: "UI/UX Designer & Developer",
            description: "Combining design expertise with technical implementation",
        },
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
                <h2 className="text-sm uppercase tracking-widest text-[var(--accentColor)] mb-1 md:mb-2">03</h2>
                <div className="flex items-center mb-4 md:mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">Journey</h3>
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
                        My professional evolution through the creative and technical landscape.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

                    {/* Timeline items */}
                    <div className="space-y-12 md:space-y-20 relative pb-6 md:pb-12">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative grid grid-cols-1 md:grid-cols-5 items-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                {/* Year */}
                                <div className="md:col-span-2 md:text-right md:pr-12 mb-3 md:mb-0">
                                    <div className="text-4xl md:text-5xl font-bold text-white/20 tracking-tighter">{item.year}</div>
                                </div>

                                {/* Circle on the timeline */}
                                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] top-0 md:top-1/2 md:mt-[-8px] w-4 h-4 rounded-full bg-[var(--accentColor)]" />

                                {/* Content */}
                                <div className="md:col-span-2 md:pl-12 pl-6 border-l md:border-l-0 border-white/10 md:border-none">
                                    <h3 className="text-lg md:text-xl text-white font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm md:text-base text-white/70">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Journey; 