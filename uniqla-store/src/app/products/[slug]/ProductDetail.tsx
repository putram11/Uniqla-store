"use client";

import { useState } from 'react';
import { Product } from '../../../models/Product';
import { FaRegStar } from 'react-icons/fa';

// AddToWishlist Component
const AddToWishlist = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }), // userId should be handled by middleware or authentication
      });

      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }

      const result = await response.json();
      alert(result.message || 'Added to wishlist!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error adding to wishlist:', error.message);
      } else {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={loading}
      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? 'Adding...' : 'Add to Wishlist'}
    </button>
  );
};

// ProductDetail Component
const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          <AddToWishlist productId={product._id.toString()} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
