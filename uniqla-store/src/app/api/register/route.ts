import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '../../../models/User';

export async function POST(req: NextRequest) {
  console.log('Received request:', req.method); 

  if (req.method === 'POST') {
    try {
      const userInput = await req.json(); // Use req.json() to parse the request body

      if (!userInput.name || !userInput.username || !userInput.email || !userInput.password) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }

      await createUser(userInput);
      return NextResponse.json({ message: 'User successfully registered' }, { status: 201 });
    } catch (error) {
      console.error('Error registering user:', error);
      return NextResponse.json({ message: 'Failed to register user' }, { status: 500 });
    }
  }
  
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
