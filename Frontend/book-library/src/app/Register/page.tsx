"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:7081/api/auth/register", { email, password });
      setSuccess("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => {
        router.push("/Login"); // Redirect to Login page after successful registration
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      if (err) {
        setError(`Registration failed: ${err}`);
      } else {
        setError("Registration failed. This email might already be in use or try again later.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-green-400 text-center mb-6">
          📝 Create Your Account
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email-register" className="sr-only">Email address</label>
            <input
              id="email-register"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-md placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:z-10 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="password-register" className="sr-only">Password</label>
            <input
              id="password-register"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-md placeholder-gray-500 text-gray-100 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:z-10 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {success && (
          <p className="text-green-500 text-sm text-center -mt-2">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">
            {error}
          </p>
        )}

        <div>
          <button
            onClick={handleRegister}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
          >
            Register
          </button>
        </div>

        <div className="text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/Login" className="font-medium text-blue-500 hover:text-blue-400">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}