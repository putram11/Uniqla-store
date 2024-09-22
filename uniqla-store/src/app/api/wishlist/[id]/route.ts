import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getWishlistCollection } from '../../../../models/Wishlist'; // Adjust the import path as needed

export async function DELETE(request: NextRequest) {
  try {
    // Retrieve the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const collection = await getWishlistCollection();
    
    // Perform the delete operation
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item removed from wishlist' }, { status: 200 });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    return NextResponse.json({ message: 'Failed to remove item from wishlist' }, { status: 500 });
  }
}
