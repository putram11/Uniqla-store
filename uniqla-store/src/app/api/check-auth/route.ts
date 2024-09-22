// File: src/app/api/check-auth/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authCookie = request.headers.get('cookie')?.includes('authToken');
  
  if (authCookie) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
