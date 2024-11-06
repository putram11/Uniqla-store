import { NextResponse } from 'next/server';

// Define the API handler for the logout route
export async function GET() {
  // Create a response to delete the 'authToken' cookie by setting an expired cookie
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  
  response.cookies.set('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Immediately expire the cookie
    path: '/',
  });

  return response;
}
