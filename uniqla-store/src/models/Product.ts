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

// Fetch all products with pagination and search
export const getAllProducts = async (
  page: number = 1,
  limit: number = 8,
  query: string = ''
): Promise<{ data: Product[], totalProducts: number }> => {
  const collection = await getCollection();
  const skip = (page - 1) * limit;
  const searchRegex = new RegExp(query, 'i');

  try {
    const queryFilter = { name: { $regex: searchRegex } };
    
    // Get the total count of matching products
    const totalProducts = await collection.countDocuments(queryFilter);

    // Fetch the products with pagination
    const products = await collection
      .find(queryFilter)
      .skip(skip)
      .limit(limit)
      .toArray();

    return { data: products, totalProducts };
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Fetch a limited number of products for the homepage
export const getHomepageProducts = async (): Promise<Product[]> => {
  const collection = await getCollection();

  try {
    // Only fetch essential fields if needed, e.g. name, price, thumbnail, etc.
    return await collection.find().limit(4).toArray();
  } catch (error) {
    console.error('Error fetching homepage products:', error);
    throw new Error('Failed to fetch homepage products');
  }
};

// Fetch a product by its slug
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const collection = await getCollection();

  try {
    return await collection.findOne({ slug });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw new Error('Failed to fetch product');
  }
};

