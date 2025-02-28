import React, { useEffect } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './styles/SocialIcons.css';

const SocialIcons: React.FC = () => {
    useEffect(() => {
        const social = document.getElementById("social") as HTMLElement;

        social?.querySelectorAll("span").forEach((item) => {
            const elem = item as HTMLElement;
            const link = elem.querySelector("a") as HTMLElement;

            const rect = elem.getBoundingClientRect();
            let mouseX = rect.width / 2;
            let mouseY = rect.height / 2;
            let currentX = 0;
            let currentY = 0;

            const updatePosition = () => {
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;

                link.style.setProperty("--siLeft", `${currentX}px`);
                link.style.setProperty("--siTop", `${currentY}px`);

                requestAnimationFrame(updatePosition);
            };

            const onMouseMove = (e: MouseEvent) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x < 45 && x > 5 && y < 45 && y > 5) {
                    mouseX = x;
                    mouseY = y;
                } else {
                    mouseX = rect.width / 2;
                    mouseY = rect.height / 2;
                }
            };

            document.addEventListener("mousemove", onMouseMove);
            updatePosition();

            return () => {
                document.removeEventListener("mousemove", onMouseMove);
            };
        });
    }, []);

    return (
        <div className="icons-section">
            <div className="social-icons" data-cursor="icons" id="social">
                <span>
                    <a
                        href="https://github.com/Eanazir"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        tabIndex={0}
                    >
                        <FaGithub />
                    </a>
                </span>
                <span>
                    <a
                        href="https://www.linkedin.com/in/eyad-nazir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        tabIndex={0}
                    >
                        <FaLinkedinIn />
                    </a>
                </span>
                <span>
                    <a
                        href="https://www.instagram.com/eyadakn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        tabIndex={0}
                    >
                        <FaInstagram />
                    </a>
                </span>
                <span>
                    <a
                        href="https://x.com/Eyadakn1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (Twitter)"
                        tabIndex={0}
                    >
                        <FaXTwitter />
                    </a>
                </span>
            </div>
        </div>
    );
};

export default SocialIcons;