"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBlog,
  FaTags,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const isActive = (path) => {
    return pathname === path
      ? "bg-orange-500 text-white"
      : "hover:bg-orange-100 hover:bg-opacity-50";
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        onClick={toggleMenu}
        style={{ backgroundColor: "var(--background-primary)" }}
      >
        <div className="space-y-2">
          <span
            className={`block w-8 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
            style={{ backgroundColor: "var(--text-primary)" }}
          ></span>
          <span
            className={`block w-8 h-0.5 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundColor: "var(--text-primary)" }}
          ></span>
          <span
            className={`block w-8 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
            style={{ backgroundColor: "var(--text-primary)" }}
          ></span>
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        transform transition-transform duration-300 ease-in-out
        fixed left-0 top-0 h-screen border-r md:w-[15%] w-3/4 z-40
        md:translate-x-0 md:fixed
      `}
        style={{
          backgroundColor: "var(--background-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          className="px-4  h-[10vh] flex items-center border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={150}
            height={40}
            className="m-auto"
          />
        </div>

        <nav className="mt-4">
          <Link
            href="/admin/dashboard"
            className={`flex items-center p-4 ${isActive("/admin/dashboard")}`}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <FaTachometerAlt className="inline-block mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/dashboard/category"
            className={`flex items-center p-4 ${isActive(
              "/admin/dashboard/category"
            )}`}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <FaTags className="inline-block mr-2" />
            Category
          </Link>
          <Link
            href="/admin/dashboard/contact"
            className={`flex items-center p-4 ${isActive(
              "/admin/dashboard/contact"
            )}`}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <FaEnvelope className="inline-block mr-2" />
            Contact
          </Link>
          <Link
            href="/admin/dashboard/subscribed"
            className={`flex items-center p-4 ${isActive(
              "/admin/dashboard/subscribed"
            )}`}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <FaUser className="inline-block mr-2" />
            Subscribed Users
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
