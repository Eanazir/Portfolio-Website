import React, { useState, useEffect } from "react";
import logo from "/logo.svg";
import HoverLinks from "./HoverLinks";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("About");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update current section based on scroll thresholds – adjust as needed
      if (scrollY < 300) {
        setCurrentSection("About");
      } else if (scrollY < 600) {
        setCurrentSection("Work/Projects");
      } else {
        setCurrentSection("Contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ease-in-out ${
        isScrolled ? "opacity-100" : "opacity-95"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-in-out ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled
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
              className={`text-white text-lg font-medium px-4 py-1.5 rounded-full bg-gray-800/30 border border-teal-400/10 transition-opacity duration-300 ease-in-out ${
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
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
                  <HoverLinks text="About" href="#about" />
                </li>
                <li>
                  <HoverLinks text="Work/Projects" href="#work" />
                </li>
                <li>
                  <HoverLinks text="Contact" href="#contact" />
                </li>
              </ul>
            </nav>
            <div
              className="md:hidden ml-4 cursor-pointer p-2 hover:bg-gray-800/30 rounded-full transition-colors"
              onClick={toggleMobileMenu}
            >
              <div className="space-y-1.5 w-5">
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-0" : "w-3/4 opacity-100"
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full right-4 mt-2 w-48 bg-gray-900/80 backdrop-blur-md p-5 rounded-lg shadow-lg border border-gray-800/20 animate-fadeIn">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#about"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-teal-400 transition-colors duration-200 ease-in-out flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2.5 opacity-70" />
                  About
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-teal-400 transition-colors duration-200 ease-in-out flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2.5 opacity-70" />
                  Work/Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-teal-400 transition-colors duration-200 ease-in-out flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2.5 opacity-70" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;