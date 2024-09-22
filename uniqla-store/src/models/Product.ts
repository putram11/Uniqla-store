// models/productModel.ts
import { connectDB } from '../db/config';
import { ObjectId, Collection } from 'mongodb';

// Define the Product interface
export interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to get the collection
const getCollection = async (): Promise<Collection<Product>> => {
  const db = await connectDB();
  return db.collection<Product>('products'); // Ensure the type is explicitly assigned to Product
};

// Fetch all products with pagination
export const getAllProducts = async (page: number = 1, limit: number = 8, query: string = ''): Promise<Product[]> => {
  const collection = await getCollection();
  const skip = (page - 1) * limit;
  const searchRegex = new RegExp(query, 'i'); 

  try {
    return await collection.find({ name: { $regex: searchRegex } }).skip(skip).limit(limit).toArray();
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch products');
  }
};


export const getHomepageProducts = async (): Promise<Product[]> => {
  const collection = await getCollection();

  try {
    return await collection.find().limit(4).toArray();
  } catch (error) {
    console.error('Error fetching homepage products:', error);
    throw new Error('Failed to fetch homepage products');
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const collection = await getCollection();

  try {
    return await collection.findOne({ slug });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw new Error('Failed to fetch product');
  }
};
