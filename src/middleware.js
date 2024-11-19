import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const isAuth = !!token;

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/auth/') && isAuth) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    // Redirect unauthenticated users to login
    if (pathname.startsWith('/admin/') && !isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
    
    // Exclude public API routes
    '/((?!api/public|_next/static|_next/image|favicon.ico).*)',
  ]
};
