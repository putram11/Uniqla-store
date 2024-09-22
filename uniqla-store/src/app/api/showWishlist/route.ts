// src/app/api/wishlist/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getUserWishlist } from '../../../models/Wishlist'; 

export async function GET(request: NextRequest) {
  try {
    const userIdHeader = request.headers.get('x-user-id');
    if (!userIdHeader) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const userId = new ObjectId(userIdHeader);

    const wishlist = await getUserWishlist(userId);

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ message: 'Failed to fetch wishlist' }, { status: 500 });
  }
}
