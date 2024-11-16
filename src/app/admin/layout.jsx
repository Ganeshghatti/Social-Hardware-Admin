'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
