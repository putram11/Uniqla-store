import { NextResponse } from 'next/server';
import { connectDB } from '../../../db/config';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const db = await connectDB();
    const collection = db.collection('wishlists');

    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ message: 'User ID is missing' }, { status: 400 });
    }

    await collection.insertOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'Added to wishlist' }, { status: 200 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json({ message: 'Adding to wishlist failed' }, { status: 500 });
  }
}
