import React from 'react';
import './styles/CareerTimeline.css';

interface CareerTimelineProps {
    sectionRef: React.RefObject<HTMLDivElement>;
}

const CareerTimeline = ({ sectionRef }: CareerTimelineProps) => {
    return (
        <div
            ref={sectionRef}
            className="careerSection"
            id="work"
        >
            <div className="careerContainer">
                <h2>
                    My career <span>&</span>
                    <br /> experience
                </h2>
                <div className="careerInfo">
                    <div className="careerTimeline">
                        <div className="careerDot"></div>
                    </div>

                    {/* Tesla */}
                    <div className="careerInfoBox">
                        <div className="careerInfoIn">
                            <div className="careerRole">
                                <h4>System/Software Engineering Intern</h4>
                                <h5>Tesla</h5>
                            </div>
                            <h3>2023</h3>
                        </div>
                        <p>
                            Developed a comprehensive project plan for the Tesla breaker conversion project, reducing retrofitting efforts by 20% and improving efficiency by 15%.
                            Collaborated with cross-functional teams to align with technical and business objectives.
                            Designed and optimized electrical components for automation systems.
                        </p>
                    </div>

                    {/* Siemens */}
                    <div className="careerInfoBox">
                        <div className="careerInfoIn">
                            <div className="careerRole">
                                <h4>ELDP Software Engineering Intern</h4>
                                <h5>Siemens USA</h5>
                            </div>
                            <h3>2023</h3>
                        </div>
                        <p>
                            Optimized system performance by integrating new devices into an advanced API for Breaker digital twin, achieving over 30% performance improvements.
                            Developed an intuitive GUI using C# on the .NET platform.
                            Utilized NLP model insights to prioritize product improvements, reducing customer complaints by 25%.
                        </p>
                    </div>

                    {/* Amazon */}
                    <div className="careerInfoBox">
                        <div className="careerInfoIn">
                            <div className="careerRole">
                                <h4>Software Development Engineer (Embedded) Intern</h4>
                                <h5>Amazon – Project Kuiper</h5>
                            </div>
                            <h3>2024</h3>
                        </div>
                        <p>
                            Designed and implemented firmware algorithms for antenna components, reducing bootup times by 80%.
                            Integrated timing metrics using C++ and FreeRTOS with Grafana dashboard visualization, identifying improvement areas.
                            Automated hardware processes with Python and Linux OS, improving RF beam testing speed by 40%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerTimeline; 