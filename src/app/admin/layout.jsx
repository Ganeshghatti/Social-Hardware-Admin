'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthCheck from '@/components/AuthCheck';

export default function AdminLayout({ children }) {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
