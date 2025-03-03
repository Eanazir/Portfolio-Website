import React, { useState, useEffect } from "react";
import logo from "/logo.svg";
import HoverLinks from "./HoverLinks";
import MobileMenu from "./MobileMenu";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("About");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to trigger fade-in animation with a slight delay
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 300); // Delay header appearance by 300ms to ensure background appears first

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Get all sections by their IDs
      const aboutSection = document.getElementById('aboutMe');
      const workSection = document.getElementById('work');
      const contactSection = document.getElementById('contact');

      // Calculate the position of each section relative to the viewport
      const workPosition = workSection?.getBoundingClientRect();
      const contactPosition = contactSection?.getBoundingClientRect();

      // Determine which section is currently most visible
      // Using a threshold to consider a section "in view"
      const threshold = 200;

      if (contactSection && contactPosition && contactPosition.top < threshold) {
        setCurrentSection("Contact");
      } else if (workSection && workPosition && workPosition.top < threshold) {
        setCurrentSection("Work/Projects");
      } else if (aboutSection) {
        setCurrentSection("About");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Run once to set initial section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Function to handle navbar link clicks
  const handleNavLinkClick = (sectionName: string) => {
    setCurrentSection(sectionName);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ease-in-out ${isScrolled ? "opacity-100" : "opacity-95"
        } ${isMounted ? "animate-fadeIn" : "opacity-0"}`}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-in-out ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
          ? "w-[90%] py-3 px-7 mt-4 bg-[rgba(11,12,16,0.4)] backdrop-blur-[12px] shadow-[0_10px_30px_-10px_rgba(11,12,16,0.55)] rounded-xl"
          : "w-[95%] py-5 px-8 bg-transparent rounded-b-xl"
          }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center transition-transform duration-300 ease-in-out hover:scale-125">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain opacity-90 transition-all duration-300"
            />
          </div>

          {/* Center Container: only breadcrumb */}
          <div className="absolute left-1/2 transform -translate-x-1/2 max-lg:hidden">
            {/* Breadcrumb (visible when scrolled) */}
            <span
              className={`text-white text-lg font-medium px-4 py-1.5 rounded-full bg-gray-800/30 border border-teal-400/10 transition-opacity duration-300 ease-in-out ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              {currentSection}
            </span>
          </div>

          {/* Right: Navigation (desktop) + Mobile Hamburger */}
          <div data-cursor="disable" className="flex justify-end items-center">
            <nav>
              <ul className="max-md:hidden md:flex gap-20">
                <li>
                  <HoverLinks text="About" href="#aboutMe" onClick={() => handleNavLinkClick("About")} />
                </li>
                <li>
                  <HoverLinks text="Work/Projects" href="#work" onClick={() => handleNavLinkClick("Work/Projects")} />
                </li>
                <li>
                  <HoverLinks text="Contact" href="#contact" onClick={() => handleNavLinkClick("Contact")} />
                </li>
              </ul>
            </nav>
            <div
              className="md:hidden ml-4 cursor-pointer p-2 hover:bg-gray-800/30 rounded-full transition-colors"
              onClick={toggleMobileMenu}
            >
              <div className="space-y-1.5 w-5">
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? "opacity-0" : "w-3/4 opacity-100"
                    }`}
                />
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentSection={currentSection}
        />
      </div>
    </header>
  );
};

export default Header;