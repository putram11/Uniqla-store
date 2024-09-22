"use client";

import { useState, useEffect } from 'react';

const ListWishlist = ({ wishlist, onRemove }: { wishlist: any[], onRemove: (id: string) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {wishlist.map((item) => (
      <div key={item._id.toString()} className="border rounded-lg p-4 shadow-lg">
        <img
          src={item.product.thumbnail}
          alt={item.product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{item.product.name}</h2>
        <p className="text-gray-700 mb-2">{item.product.description}</p>
        <p className="text-lg font-semibold mb-4">${item.product.price.toFixed(2)}</p>
        <button
          onClick={() => onRemove(item._id.toString())}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
);

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch('/api/showWishlist');
        if (!res.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const contentType = res.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type');
        }

        const data = await res.json();
        setWishlist(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.error('Error fetching wishlist:', error.message);
        } else {
          setError('An unexpected error occurred');
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id.toString() !== id));
      alert('Item removed from wishlist');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error removing item from wishlist:', error.message);
      } else {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <ListWishlist wishlist={wishlist} onRemove={handleRemoveFromWishlist} />
    </div>
  );
};

export default WishlistPage;
