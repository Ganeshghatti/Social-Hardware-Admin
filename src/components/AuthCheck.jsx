'use client';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Loader from './Loader';

export default function AuthCheck({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session && !pathname.startsWith('/auth/')) {
      router.push('/auth/signin');
    } else if (session && pathname.startsWith('/auth/')) {
      router.push('/admin/dashboard');
    }
  }, [session, status, router, pathname]);

  if (status === 'loading') {
    return <Loader />;
  }

  return <>{children}</>;
}
