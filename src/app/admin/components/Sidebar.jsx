"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            href="/admin/dashboard/category"
            className={`flex items-center p-4 ${isActive("/admin/dashboard/category")}`}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Category
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
