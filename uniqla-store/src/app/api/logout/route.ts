import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the API handler for the logout route
export async function GET() {
  const cookieStore = cookies();

  // Delete the 'authToken' cookie
  cookieStore.delete('authToken');

  // Return a JSON response confirming logout
  return NextResponse.json({ message: 'Logged out successfully' });
}
