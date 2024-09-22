import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 
import type { NextRequest } from 'next/server';
import { verifyToken } from './helpers/jsonwebtoken'; 

export async function middleware(request: NextRequest) {
  const cookieStore = cookies(); 
  const authCookie = cookieStore.get('authToken'); 

  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const authToken = authCookie.value;

  try {
    const user = await verifyToken(authToken);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.error('Invalid token:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/wishlist', '/api/wishlist/:path*', '/api/showWishlist'],
};
