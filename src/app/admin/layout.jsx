'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthCheck from '@/components/AuthCheck';

export default function AdminLayout({ children }) {
  return (
    <AuthCheck>
      <div className="min-h-screen">
        <Sidebar />
        <div className="pl-64">
          <Navbar />
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
