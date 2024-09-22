import { ObjectId } from 'mongodb';
import { connectDB } from '../db/config';
import { Collection } from 'mongodb';


interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
}


export interface Wishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  product?: Product; 
}

export const getWishlistCollection = async (): Promise<Collection<Wishlist>> => {
  const db = await connectDB();
  return db.collection<Wishlist>('wishlists');
};

export const addToWishlist = async (userId: ObjectId, productId: ObjectId): Promise<void> => {
  const collection = await getWishlistCollection();
  const wishlistItem: Wishlist = {
    _id: new ObjectId(),
    userId: new ObjectId(userId),
    productId:new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collection.insertOne(wishlistItem);
};


export const getUserWishlist = async (userId: ObjectId): Promise<Wishlist[]> => {
  const collection = await getWishlistCollection();

  const wishlist = await collection.aggregate<Wishlist>([
    { $match: { userId } },
    {
      $lookup: {
        from: 'products', 
        localField: 'productId',
        foreignField: '_id',
        as: 'product' 
      }
    },
    { $unwind: '$product' }, 
    { $sort: { createdAt: -1 } } 
  ]).toArray();

  return wishlist;
};

