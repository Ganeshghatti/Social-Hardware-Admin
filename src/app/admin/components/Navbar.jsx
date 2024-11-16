'use client';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="shadow-md" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="mx-auto px-6 py-3">
        <div className="flex justify-end items-center">
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
}
