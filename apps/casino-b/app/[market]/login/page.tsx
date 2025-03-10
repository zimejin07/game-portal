"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@repo/store/userSlice";
import { LoginData } from "@repo/types";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { market } = useParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users");
    const data = await res.json();
    const user = data.users.find(
      (u: any) =>
        u.username === loginData.username && u.password === loginData.password
    );

    if (user && user.market === market) {
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`;
      document.cookie = `market=${market}; path=/`;
      dispatch(setUser({ username: user.username, market: user.market }));
      router.push(`/${market}/casino`);
    } else {
      setError("Invalid credentials or incorrect market.");
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
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
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
