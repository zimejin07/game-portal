"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@repo/store/userSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { market } = useParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔐 Login attempt initiated");
  
    try {
      // Fetch user data from API
      const res = await fetch("/api/users");
      console.log("🌐 Fetched user data from /api/users");
      
      const data = await res.json();
      console.log(`📊 Retrieved ${data.users.length} users from API`);
  
      // Find the user in the fetched data
      const user = data.users.find(
        (u: any) => u.username === username && u.password === password
      );
      console.log(user ? `✅ User found: ${user.username}` : "❌ User not found or incorrect credentials");
  
      // Check if user is valid and market matches
      if (user && user.market === market) {
        console.log(`🛒 User market confirmed: ${market}`);
  
        // Save user and market in cookies
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`;
        document.cookie = `market=${market}; path=/`;
        console.log("🍪 User and market saved in cookies");
  
        // Update user state and redirect
        dispatch(setUser({ username: user.username, market: user.market }));
        console.log("🚀 Dispatching setUser action");
  
        router.push(`/${market}/casino`);
        console.log(`🔀 Redirecting to /${market}/casino`);
      } else {
        setError("Invalid credentials or incorrect market.");
        console.error("⚠️ Invalid login attempt: Incorrect credentials or market mismatch");
      }
    } catch (error) {
      console.error("❌ Error occurred during login:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Login to {market} Market</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
