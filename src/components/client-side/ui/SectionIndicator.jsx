'use client'
import React, { useState, useEffect } from "react";

const sections = [
  { id: "technology", name: "TECHNOLOGY" },
  { id: "blogs", name: "BLOGS" },
  { id: "video", name: "DEMO" },
  { id: "features", name: "FEATURES" },
  // { id: "partners", name: "PARTNERS" },
  // { id: "functionalities", name: "FUNCTIONALITIES" },
  { id: "faq", name: "F.A.Q" },
  { id: "partnerships", name: "PARTNERSHIPS" },
  { id: "contact", name: "CONTACT" },
  { id: "twitterposts", name: "FOLLOW US" },
  // { id: "whatsappCTA", name: "WHATSAPP" }
];

const Dot = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="5"
    height="5"
    viewBox="0 0 5 5"
    fill="none"
    className="my-2 mx-auto"
  >
    <circle cx="2.67969" cy="2.55078" r="2" fill="#4E4E4E" />
  </svg>
);

export default function SectionIndicator() {
  const [currentSection, setCurrentSection] = useState("");
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const heroSection = document.getElementById("hero");

      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsHeroVisible(window.scrollY < heroBottom);
      }

      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHeroVisible) {
    return null;
  }

  return (
    <div
      className={`fixed right-0 z-10 md:right-[5%] top-1/2 transform -translate-y-1/2 ${
        isHeroVisible ? "hidden" : ""
      }`}
    >
      {sections.map((section) => (
        <div
          key={section.id}
          className="flex justify-center items-center h-8 w-14 md:w-24"
        >
          {currentSection === section.id ? (
            <div className="flex items-center flex-col justify-center m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                className="ml-0.5"
              >
                <circle cx="4.3125" cy="4.16406" r="4" fill="#E7A349" />
              </svg>
              <span className="text-white text-[6px] md:text-sm font-['VioletSans'] fancy-text-border m-auto">
                {section.name}
              </span>
            </div>
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <Dot />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
