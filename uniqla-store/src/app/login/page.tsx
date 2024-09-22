"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      router.push("/");

    } catch (err) {
      setError("Failed to login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="p-8 bg-white border border-black rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          UNIQLA
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <label className="input input-bordered flex flex-col gap-2 text-lg">
            Email
            <input
              type="email"
              className="input input-bordered p-3 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </label>
          <button
            type="submit"
            className={`btn btn-primary w-full py-3 text-lg rounded-md transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
