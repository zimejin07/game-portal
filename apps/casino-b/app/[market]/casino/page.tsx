"use client";

import { useEffect, useState } from "react";

export default function CasinoLobby({ params }: { params: { market: string } }) {
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const cookieValue = document.cookie.split("; ").find(row => row.startsWith("user="))?.split("=")[1];
        if (cookieValue) {
            setUser(JSON.parse(decodeURIComponent(cookieValue)));
        }
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Casino Lobby - {params.market.toUpperCase()}</h1>
            {user ? <p>Welcome, {user.username}!</p> : <p>Loading user...</p>}
            {/* Game list here */}
        </div>
    );
}
