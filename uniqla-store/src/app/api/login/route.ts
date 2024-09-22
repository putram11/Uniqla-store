import { NextRequest, NextResponse } from 'next/server';
import { verifyUserCredentials, makeToken } from '../../../models/User';
import { cookies } from 'next/headers'; 

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await verifyUserCredentials(email, password);
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = makeToken(user._id);


    const cookieStore = cookies();
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, 
      path: '/',
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
