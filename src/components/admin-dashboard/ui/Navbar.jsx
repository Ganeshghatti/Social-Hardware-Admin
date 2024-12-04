"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mobile Navbar
  const MobileNav = () => (
    <nav className="sticky top-0  shadow-md" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <button 
            className="p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-2 z-50">
              <span className={`block w-8 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} 
                    style={{ backgroundColor: 'var(--text-primary)' }}></span>
              <span className={`block w-8 h-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundColor: 'var(--text-primary)' }}></span>
              <span className={`block w-8 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                    style={{ backgroundColor: 'var(--text-primary)' }}></span>
            </div>
          </button>

          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Desktop Navbar
  const DesktopNav = () => (
    <nav className="shadow-md h-[10vh] flex items-center w-full" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="mx-auto px-6 w-full">
        <div className="flex justify-end items-center w-full">
          <div className="flex items-center space-x-4">
            <span>{session?.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
}
