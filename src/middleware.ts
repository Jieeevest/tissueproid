import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define paths that are protected (admin routes)
  const isAdminPath = path.startsWith('/admin');
  
  // Public paths that don't require authentication even in admin section
  const isPublicPath = path === '/admin/login';
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect unauthenticated users to login
  if (isAdminPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // Redirect authenticated users away from login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  // Check if user is admin for admin routes
  if (isAdminPath && !isPublicPath && token && token.role !== 'ADMIN') {
    // If not admin, redirect to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};