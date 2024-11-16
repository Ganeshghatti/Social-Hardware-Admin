import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'admin';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  },
  {
    callbacks: {
      ized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
