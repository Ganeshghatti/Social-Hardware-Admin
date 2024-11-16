'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path 
      ? 'bg-orange-500 text-white' 
      : 'hover:bg-orange-100 hover:bg-opacity-50';
  };

  return (
    <div className="w-64 h-full fixed left-0 top-0 shadow-lg" 
         style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={150}
          height={40}
          className="mx-auto"
        />
      </div>
      
      <nav className="mt-4">
        <Link 
          href="/admin/dashboard"
          className={`flex items-center p-4 ${isActive('/admin/dashboard')}`}
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
      </nav>
    </div>
  );
}
