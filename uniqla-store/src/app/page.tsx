"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaRegStar } from "react-icons/fa";
import { useRouter } from 'next/navigation'; 

const ListProduct = ({ products }: { products: any[] }) => {
  const router = useRouter();  

  const handleCardClick = (slug: string) => {
    router.push(`/products/${slug}`);  
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-xl overflow-hidden flex flex-col rounded-lg h-[600px] cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleCardClick(product.slug)}  
          >
            <figure className="flex-shrink-0">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-2/3 object-cover"
              />
            </figure>
            <div className="flex-1 p-6">
              <AddToWishlist productId={product._id} />
              <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
              <p className="text-xl font-bold text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-4">{product.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddToWishlist = ({ productId }: { productId: string }) => {
  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }), 
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      const result = await response.json();
      alert(result.message || "Added to wishlist!");
    } catch (error) {
      console.error(error);
      alert("Error adding to wishlist");
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      <FaRegStar className="text-xl" />
    </button>
  );
};

// Search Component
const Search = ({ setQuery }: { setQuery: React.Dispatch<React.SetStateAction<string>> }) => (
  <input
    type="text"
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search products"
    className="border border-gray-300 p-2 w-full mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (reset = false) => {
    try {
      const res = await fetch(`/api/product?skip=${reset ? 0 : products.length}&limit=8&query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setProducts((prev) => reset ? data : [...prev, ...data]);
        setHasMore(data.length > 0);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Infinite Scroll handler using Intersection Observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      fetchProducts();
    }
  }, [hasMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    fetchProducts(true);
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <Search setQuery={setQuery} />
      <ListProduct
        products={products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )}
      />
      <div ref={observerRef} className="h-10" />
    </div>
  );
}
