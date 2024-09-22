"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter(); 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      const data = await res.json();
      console.log(data.message);
      
    
      router.push('/login');
    } catch (err) {
      setError('Failed to register');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="p-8 bg-white border border-black rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Form fields */}
          <label className="input input-bordered flex flex-col gap-2 text-lg">
            Name
            <input
              type="text"
              className="input input-bordered p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex flex-col gap-2 text-lg">
            Username
            <input
              type="text"
              className="input input-bordered p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex flex-col gap-2 text-lg">
            Email
            <input
              type="email"
              className="input input-bordered p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex flex-col gap-2 text-lg">
            Password
            <input
              type="password"
              className="input input-bordered p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg rounded-md hover:bg-gray-600 transition-all duration-200"
          >
            Register
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
