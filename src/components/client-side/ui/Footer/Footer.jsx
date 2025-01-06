"use client";
import React from "react";
import "./Footer.scss";
import logo from "../../../../../public/client/assets/images/logo.png";
import { FaLinkedin, FaXTwitter, FaPhone, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "About Us", id: "about", link: "/about" },
    { name: "Product", id: "product", link: "/product" },
    {
      name: "Technical specifications",
      id: "technical-specifications",
      link: "/technical-specifications",
    },
    { name: "Blogs", id: "blogs", link: "/our-blogs" },
  ];
  return (
    <footer className="flex flex-col">
      <div className="flex px-[4%] justify-between flex-col gap-6 relative md:gap-0 md:flex-row items-center py-5">
        <Image
          src={logo}
          sizes="100%"
          alt="Eclipse Remote Systems"
          className="w-44 h-6 md:w-72 md:h-11 object-contain"
        />
        <ul className="flex items-center justify-center gap-4 md:gap-12 text-white md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          {navItems.map((item) =>
            item.link ? (
              <Link
                href={item.link}
                key={item.id}
                className="hover:text-oranges transition-all duration-300 cursor-pointer"
              >
                {item.name}
              </Link>
            ) : (
              <li
                key={item.id}
                className="hover:text-oranges transition-all duration-300 cursor-pointer"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </li>
            )
          )}
        </ul>
        <span className="flex items-center justify-center gap-4">
          <Link
            href="https://www.linkedin.com/company/social-hardware"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-oranges transition-all duration-300"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://x.com/social_hardware"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-oranges transition-all duration-300"
          >
            <FaXTwitter size={24} />
          </Link>
        </span>
      </div>
      <div className="flex px-[4%] justify-between flex-col gap-6 md:gap-6 md:flex-row items-center py-8 md:text-start text-center flex-wrap">
        <p>
          ISO 9001:2015 & ISO 10218-1:2011 Certified{" "}
          <br className="md:block hidden" /> DPIIT Startup Registration (No.
          10996)
        </p>
        <span className="flex items-center justify-center gap-4">
          <FaPhone
            size={24}
            className="text-white cursor-pointer hover:text-oranges"
            onClick={() => window.open("tel:+919731436520")}
          />
          <FaEnvelope
            size={24}
            className="text-white cursor-pointer hover:text-oranges"
            onClick={() => window.open("mailto:sh.lab@socialhardware.co.in")}
          />
        </span>
        <p>
          8, 34/4, 3rd Cross Rd, Pragathi Layout, Veerannapalya,{" "}
          <br className="md:block hidden" /> sadhyagappa layout, Bengaluru,
          Karnataka 560045
        </p>
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <p className="text-white text-sm text-center">
          © {new Date().getFullYear()} Social Hardware International Pvt. Ltd.
          <br className="md:hidden" /> All rights reserved
        </p>
      </div>
    </footer>
  );
}
