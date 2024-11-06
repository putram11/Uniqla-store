// File: src/app/api/check-auth/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Parse the `authToken` cookie directly
    const authToken = request.headers.get('cookie')
      ?.split('; ')
      .find(cookie => cookie.startsWith('authToken='))
      ?.split('=')[1];

    // Check if the auth token exists and respond accordingly
    const isAuthenticated = Boolean(authToken);

    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (error) {
    // Log the error and return a meaningful response
    console.error("Error checking authentication:", error);
    return NextResponse.json(
      { authenticated: false, error: "Unable to verify authentication" },
      { status: 500 }
    );
  }
}
