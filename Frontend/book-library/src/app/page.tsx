"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7081/api/auth/login", { email, password });
      localStorage.setItem("userId", res.data.userId); // Assuming your API returns userId upon successful login
      router.push("/Dash"); // Redirect to the Home page
      setError("");
    } catch (err) {
      console.error("Login error:", err);
      if (err) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please check your network and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-blue-400 text-center mb-6">
          🔐 Welcome Back!
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email-login" className="sr-only">Email address</label>
            <input
              id="email-login"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-md placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="sr-only">Password</label>
            <input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-md placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">
            {error}
          </p>
        )}

        <div>
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>

        <div className="text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/Register" className="font-medium text-green-500 hover:text-green-400">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}