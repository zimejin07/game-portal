"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@repo/store/userSlice";

export default function Login({ params }: { params: { market: string } }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/data/users.json");
        const data = await res.json();
        const user = data.users.find((u: any) => u.username === username && u.password === password);

        if (user && user.market === params.market) {
            document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600`; // Save user in cookies
            document.cookie = `market=${params.market}; path=/`; // Save market in cookies
            dispatch(setUser({ username: user.username, market: user.market }));
            router.push(`/${params.market}/casino`);
        } else {
            setError("Invalid credentials or incorrect market.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Login to {params.market.toUpperCase()} Market</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="border p-2 w-full mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
            </form>
        </div>
    );
}
