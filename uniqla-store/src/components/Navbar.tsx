"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaBoxOpen, FaHeart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Function to check if the user is authenticated
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/check-auth', { method: 'GET' });
      
      if (response.ok) {
        const { authenticated } = await response.json();
        setIsAuthenticated(authenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error checking authentication status:', err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'GET' });

      if (response.ok) {
        setIsAuthenticated(false);
        router.push("/");
        router.refresh();
      } else {
        console.error('Failed to log out');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-900">UNIQLA</h1>

        <nav className="flex flex-grow items-center justify-center space-x-4">
          <Link
            href="/"
            className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
          >
            <FaHome className="h-6 w-6 mr-1" />
            Home
          </Link>
          <Link
            href="/products"
            className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
          >
            <FaBoxOpen className="h-6 w-6 mr-1" />
            Products
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
          >
            <FaHeart className="h-6 w-6 mr-1" />
            Wishlist
          </Link>
        </nav>

        <div className="relative">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
            >
              <FaSignOutAlt className="h-6 w-6 mr-1" />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
            >
              <FaSignInAlt className="h-6 w-6 mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
