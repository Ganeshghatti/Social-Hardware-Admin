'use client'
import React from "react";
import "./Footer.scss";
import logo from "../../../../public/client-side/assets/images/logo.png"
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navItems = [
    { name: "Technology", id: "technology" },
    { name: "Tech Demo", id: "video" },
    { name: "Features", id: "features" },
    { name: "FAQ", id: "faq" },
    { name: "Partnerships", id: "partnerships" },
  ];

  return (
    <footer className="flex flex-col">
      <div className="flex px-[4%] justify-between flex-col gap-6 relative md:gap-0 md:flex-row items-center py-5">
        <img
          src={logo}
          alt="Eclipse Remote Systems"
          className="w-44 h-6 md:w-72 md:h-11 object-contain"
        />
        <ul className="flex items-center justify-center gap-4 md:gap-12 text-white md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="hover:text-orange transition-all duration-300 cursor-pointer text-sm md:text-base"
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <span className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/company/social-hardware"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange transition-all duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://x.com/social_hardware"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange transition-all duration-300"
          >
            <FaXTwitter size={24} />
          </a>
        </span>
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <p className="text-white text-sm text-center">
          © 2024 Social Hardware International Pvt. Ltd.
          <br className="md:hidden" /> All rights reserved
        </p>
      </div>
    </footer>
  );
}
